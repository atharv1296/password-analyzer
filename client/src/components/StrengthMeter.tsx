import { Progress } from "@/components/ui/progress";

interface StrengthMeterProps {
  percentage: number;
  label: string;
  color: string;
}

export default function StrengthMeter({ percentage, label, color }: StrengthMeterProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Password Strength</h3>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${color}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
