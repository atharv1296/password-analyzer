import zxcvbn from 'zxcvbn';

export interface PasswordRequirements {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasDigit: boolean;
  hasSpecial: boolean;
  hasUniqueChars: boolean;
}

export interface PasswordStrength {
  score: number; // 0-4 (zxcvbn score)
  strengthPercentage: number; // 0-100
  strengthText: string; // "Very Weak", "Weak", "Moderate", "Strong", "Very Strong"
  strengthColor: string; // CSS color class
  feedbackWarnings: string[];
  feedbackSuggestions: string[];
  crackTimeSeconds: {
    online: number;
    offline: number;
  };
  crackTimeDisplay: {
    online: string;
    offline: string;
  };
  requirements: PasswordRequirements;
}

export function analyzePassword(password: string): PasswordStrength {
  if (!password) {
    return createEmptyStrengthResult();
  }

  // Use zxcvbn for the core analysis
  const result = zxcvbn(password);

  // Calculate requirements
  const requirements = {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasDigit: /\d/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
    hasUniqueChars: new Set(password).size / password.length >= 0.7
  };

  // Get score and strength
  const score = result.score;
  const strengthPercentage = (score / 4) * 100;
  
  // Map score to text and color
  let strengthText: string;
  let strengthColor: string;

  switch (score) {
    case 0:
      strengthText = "Very Weak";
      strengthColor = "bg-red-500";
      break;
    case 1:
      strengthText = "Weak";
      strengthColor = "bg-orange-500";
      break;
    case 2:
      strengthText = "Moderate";
      strengthColor = "bg-yellow-500";
      break;
    case 3:
      strengthText = "Strong";
      strengthColor = "bg-green-500";
      break;
    case 4:
      strengthText = "Very Strong";
      strengthColor = "bg-green-600";
      break;
    default:
      strengthText = "None";
      strengthColor = "bg-gray-300 dark:bg-gray-600";
  }

  // Format crack times
  const crackTimeSeconds = {
    online: result.crack_times_seconds.online_throttling_100_per_hour * 36, // Converting from per hour to per second
    offline: result.crack_times_seconds.offline_fast_hashing_1e10_per_second
  };

  // Add our own warnings based on requirements
  const customWarnings: string[] = [];
  if (!requirements.hasMinLength) customWarnings.push("Password is too short");
  if (!requirements.hasUppercase) customWarnings.push("No uppercase letters found");
  if (!requirements.hasLowercase) customWarnings.push("No lowercase letters found");
  if (!requirements.hasDigit) customWarnings.push("No numbers found");
  if (!requirements.hasSpecial) customWarnings.push("No special characters found");
  if (!requirements.hasUniqueChars) customWarnings.push("Password has too many repeated characters");

  // Combine with zxcvbn warnings
  const feedbackWarnings = [...(result.feedback.warning ? [result.feedback.warning] : []), ...customWarnings];
  
  // Get suggestions from zxcvbn and add our own
  const customSuggestions: string[] = [];
  if (score < 3) {
    if (password.length < 12) customSuggestions.push("Use a longer password (12+ characters)");
    if (!requirements.hasUppercase || !requirements.hasLowercase) {
      customSuggestions.push("Mix uppercase and lowercase letters");
    }
    if (!requirements.hasDigit) customSuggestions.push("Add numbers to your password");
    if (!requirements.hasSpecial) {
      customSuggestions.push("Add symbols like !, @, #, $ to strengthen your password");
    }
    if (!requirements.hasUniqueChars) customSuggestions.push("Avoid repeating characters");
    if (score < 3) customSuggestions.push("Consider using a passphrase of multiple random words");
  }

  const feedbackSuggestions = [...result.feedback.suggestions, ...customSuggestions];

  return {
    score,
    strengthPercentage,
    strengthText,
    strengthColor,
    feedbackWarnings,
    feedbackSuggestions,
    crackTimeSeconds,
    crackTimeDisplay: {
      online: formatTimeEstimation(crackTimeSeconds.online),
      offline: formatTimeEstimation(crackTimeSeconds.offline)
    },
    requirements
  };
}

function createEmptyStrengthResult(): PasswordStrength {
  return {
    score: 0,
    strengthPercentage: 0,
    strengthText: "None",
    strengthColor: "bg-gray-300 dark:bg-gray-600",
    feedbackWarnings: [],
    feedbackSuggestions: [],
    crackTimeSeconds: {
      online: Infinity,
      offline: Infinity
    },
    crackTimeDisplay: {
      online: "Infinity",
      offline: "Infinity"
    },
    requirements: {
      hasMinLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasDigit: false,
      hasSpecial: false,
      hasUniqueChars: false
    }
  };
}

export function formatTimeEstimation(seconds: number): string {
  if (seconds === Infinity) return "Infinity";
  
  if (seconds < 1) {
    return "Instantly";
  } else if (seconds < 60) {
    return `${Math.ceil(seconds)} seconds`;
  } else if (seconds < 3600) {
    return `${Math.ceil(seconds / 60)} minutes`;
  } else if (seconds < 86400) {
    return `${Math.ceil(seconds / 3600)} hours`;
  } else if (seconds < 31536000) {
    return `${Math.ceil(seconds / 86400)} days`;
  } else if (seconds < 315360000) { // 10 years
    return `${Math.ceil(seconds / 31536000)} years`;
  } else if (seconds < 3153600000) { // 100 years
    return `${Math.ceil(seconds / 31536000)} years`;
  } else {
    return "Centuries";
  }
}
