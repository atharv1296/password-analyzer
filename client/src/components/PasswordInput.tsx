import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  isAnalyzing: boolean;
  status?: string;
}

export default function PasswordInput({ value, onChange, isAnalyzing, status }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const getStatusColor = () => {
    if (!value) return "text-gray-500 dark:text-gray-400";
    
    switch (status) {
      case "Very Weak":
      case "Weak":
        return "text-red-600 dark:text-red-400";
      case "Moderate":
        return "text-yellow-600 dark:text-yellow-400";
      case "Strong":
      case "Very Strong":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  return (
    <div className="mb-6">
      <Label htmlFor="password" className="text-sm font-medium mb-1">Enter your password</Label>
      <div className="relative">
        <Input
          type={isPasswordVisible ? "text" : "password"}
          id="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a password to analyze"
          className="w-full font-mono pr-10"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          {isPasswordVisible ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <p className={`text-sm mt-1 ${getStatusColor()}`}>
        {isAnalyzing
          ? "Analyzing password..."
          : value
            ? `Password is ${status?.toLowerCase()}`
            : "Enter a password to see analysis"}
      </p>
    </div>
  );
}
