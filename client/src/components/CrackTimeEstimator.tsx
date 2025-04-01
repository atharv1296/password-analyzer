import { Clock, AlertCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CrackTimeEstimatorProps {
  onlineTime: string;
  offlineTime: string;
  showWarning: boolean;
}

export default function CrackTimeEstimator({ 
  onlineTime, 
  offlineTime, 
  showWarning 
}: CrackTimeEstimatorProps) {
  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
        <Clock className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
        Estimated Time to Crack
      </h3>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="p-2 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Online Attack</p>
            <p className="font-mono text-sm font-medium text-gray-800 dark:text-gray-200">{onlineTime}</p>
          </div>
          <div className="p-2 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Offline Attack</p>
            <p className="font-mono text-sm font-medium text-gray-800 dark:text-gray-200">{offlineTime}</p>
          </div>
        </div>
        <div 
          className={cn(
            "text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 p-2 rounded border border-amber-200 dark:border-amber-800",
            showWarning ? "block" : "hidden"
          )}
        >
          <AlertCircleIcon className="h-3 w-3 inline mr-1" />
          <span>Your password could be cracked relatively quickly!</span>
        </div>
      </div>
    </div>
  );
}
