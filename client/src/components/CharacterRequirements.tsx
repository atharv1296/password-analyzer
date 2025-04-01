import { CheckSquare, CheckIcon, XIcon } from "lucide-react";
import { type PasswordRequirements } from "@/lib/passwordStrength";

interface CharacterRequirementsProps {
  requirements?: PasswordRequirements;
}

export default function CharacterRequirements({ requirements }: CharacterRequirementsProps) {
  const defaultRequirements: PasswordRequirements = {
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasDigit: false,
    hasSpecial: false,
    hasUniqueChars: false
  };

  const reqs = requirements || defaultRequirements;

  // Helper function to render requirement item
  const RequirementItem = ({ 
    isMet, 
    label 
  }: { 
    isMet: boolean; 
    label: string 
  }) => (
    <div className={`flex items-center gap-2 text-sm ${
      isMet 
        ? "text-green-700 dark:text-green-400" 
        : "text-gray-500 dark:text-gray-400"
    }`}>
      {isMet 
        ? <CheckIcon className="h-4 w-4 text-green-500" /> 
        : <XIcon className="h-4 w-4 text-red-500" />
      }
      <span>{label}</span>
    </div>
  );

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
        <CheckSquare className="h-4 w-4 mr-2 text-purple-500 dark:text-purple-400" />
        Character Requirements
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <RequirementItem isMet={reqs.hasMinLength} label="8+ characters" />
        <RequirementItem isMet={reqs.hasUppercase} label="Uppercase" />
        <RequirementItem isMet={reqs.hasLowercase} label="Lowercase" />
        <RequirementItem isMet={reqs.hasDigit} label="Numbers" />
        <RequirementItem isMet={reqs.hasSpecial} label="Special chars" />
        <RequirementItem isMet={reqs.hasUniqueChars} label="Unique chars" />
      </div>
    </div>
  );
}
