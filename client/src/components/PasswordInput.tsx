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
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
      <Label htmlFor="password" className="text-base font-medium mb-2 block text-gray-700 dark:text-gray-300">Enter your password to analyze</Label>
      <div className="relative">
        <Input
          type={isPasswordVisible ? "text" : "password"}
          id="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a password to check its strength"
          className="w-full font-mono pr-10 text-base py-6 border-emerald-200 dark:border-emerald-900/30 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          {isPasswordVisible ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="flex items-center mt-3">
        <div className={`w-3 h-3 rounded-full mr-2 ${value ? getStatusColor().replace('text-', 'bg-') : 'bg-gray-300 dark:bg-gray-600'}`}></div>
        <p className={`text-sm ${getStatusColor()}`}>
          {isAnalyzing
            ? "Analyzing password security..."
            : value
              ? `Password strength: ${status?.toLowerCase()}`
              : "Enter a password to see real-time security analysis"}
        </p>
      </div>
    </div>
  );
}
