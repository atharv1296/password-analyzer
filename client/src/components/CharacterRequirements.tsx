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
    <div className={`flex items-center p-2 rounded-md ${
      isMet 
        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" 
        : "bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400"
    }`}>
      {isMet 
        ? <CheckIcon className="h-4 w-4 text-emerald-500 mr-2" /> 
        : <XIcon className="h-4 w-4 text-red-500 mr-2" />
      }
      <span className="text-sm">{label}</span>
    </div>
  );

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
        <CheckSquare className="h-5 w-5 mr-2 text-emerald-500 dark:text-emerald-400" />
        Character Requirements
      </h3>
      <div className="grid grid-cols-2 gap-3">
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
