import { Progress } from "@/components/ui/progress";
import { Shield, ShieldAlert, ShieldCheck, ShieldX, ShieldOff } from "lucide-react";

interface StrengthMeterProps {
  percentage: number;
  label: string;
  color: string;
}

export default function StrengthMeter({ percentage, label, color }: StrengthMeterProps) {
  // Function to get the appropriate shield icon based on strength
  const getShieldIcon = () => {
    if (percentage === 0) return <ShieldOff className="h-5 w-5 text-gray-400" />;
    if (percentage < 30) return <ShieldX className="h-5 w-5 text-red-500" />;
    if (percentage < 50) return <ShieldAlert className="h-5 w-5 text-pink-500" />;
    if (percentage < 75) return <Shield className="h-5 w-5 text-purple-500" />;
    return <ShieldCheck className="h-5 w-5 text-emerald-500" />;
  };

  // Get appropriate text color based on strength
  const getTextColor = () => {
    if (percentage === 0) return "text-gray-500 dark:text-gray-400";
    if (percentage < 30) return "text-red-600 dark:text-red-400";
    if (percentage < 50) return "text-pink-600 dark:text-pink-400";
    if (percentage < 75) return "text-purple-600 dark:text-purple-400";
    return "text-emerald-600 dark:text-emerald-400";
  };

  // Get appropriate background color for label
  const getLabelBgColor = () => {
    if (percentage === 0) return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    if (percentage < 30) return "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
    if (percentage < 50) return "bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300";
    if (percentage < 75) return "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300";
    return "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300";
  };

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          {getShieldIcon()}
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">Password Strength</h3>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getLabelBgColor()}`}>
          {label}
        </span>
      </div>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className={`text-xs font-semibold inline-block ${getTextColor()}`}>
              {percentage}%
            </span>
          </div>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${color}`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
