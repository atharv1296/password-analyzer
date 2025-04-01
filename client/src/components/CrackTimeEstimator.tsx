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
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
        <Clock className="h-5 w-5 mr-2 text-emerald-500 dark:text-emerald-400" />
        Crack Time Estimation
      </h3>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 border border-emerald-100 dark:border-gray-600">
            <div className="flex items-center mb-1">
              <span className="w-2 h-2 bg-emerald-400 dark:bg-emerald-500 rounded-full mr-1.5"></span>
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Online Attack</p>
            </div>
            <p className="font-mono text-sm font-medium text-gray-800 dark:text-gray-200 ml-3.5">{onlineTime}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3.5">Throttled brute force (100/hour)</p>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 border border-emerald-100 dark:border-gray-600">
            <div className="flex items-center mb-1">
              <span className="w-2 h-2 bg-pink-400 dark:bg-pink-500 rounded-full mr-1.5"></span>
              <p className="text-xs font-medium text-pink-700 dark:text-pink-300">Offline Attack</p>
            </div>
            <p className="font-mono text-sm font-medium text-gray-800 dark:text-gray-200 ml-3.5">{offlineTime}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3.5">Fast hash (10¹⁰/second)</p>
          </div>
        </div>
        <div 
          className={cn(
            "text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800 mt-1",
            showWarning ? "flex items-start" : "hidden"
          )}
        >
          <AlertCircleIcon className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-medium">Warning:</span> Your password could be cracked relatively quickly! Consider using a stronger password with a mix of characters.
          </div>
        </div>
      </div>
    </div>
  );
}
