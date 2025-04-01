import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImprovementSuggestions() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
          <Wand2 className="h-5 w-5 mr-2 text-emerald-500 dark:text-emerald-400" />
          Password Creation Strategies
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleVisibility}
          className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 h-7 px-2"
        >
          {isVisible ? 'Hide strategies' : 'Show strategies'}
        </Button>
      </div>
      
      {!isVisible && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Learn effective techniques for creating strong, memorable passwords.
        </p>
      )}
      
      {isVisible && (
        <div className="space-y-3 mt-3">
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
            <div className="flex items-center">
              <div className="bg-emerald-400 dark:bg-emerald-500 h-8 w-8 rounded-full flex items-center justify-center text-white mr-3">1</div>
              <h4 className="font-medium text-emerald-800 dark:text-emerald-300 text-sm">Use a passphrase</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 ml-11">
              Combine 4+ random words for a strong, memorable password.
            </p>
            <div className="mt-2 p-2 bg-white dark:bg-gray-800/80 rounded-md border border-emerald-200 dark:border-emerald-900/30 text-sm font-mono ml-11">
              correct-horse-battery-staple
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
            <div className="flex items-center">
              <div className="bg-emerald-400 dark:bg-emerald-500 h-8 w-8 rounded-full flex items-center justify-center text-white mr-3">2</div>
              <h4 className="font-medium text-emerald-800 dark:text-emerald-300 text-sm">Add complexity strategically</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 ml-11">
              Replace letters with similar-looking numbers or symbols.
            </p>
            <div className="mt-2 p-2 bg-white dark:bg-gray-800/80 rounded-md border border-emerald-200 dark:border-emerald-900/30 text-sm font-mono ml-11">
              p@$$w0rd → P@$$w0rd_2023!
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
            <div className="flex items-center">
              <div className="bg-emerald-400 dark:bg-emerald-500 h-8 w-8 rounded-full flex items-center justify-center text-white mr-3">3</div>
              <h4 className="font-medium text-emerald-800 dark:text-emerald-300 text-sm">Avoid predictable patterns</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 ml-11">
              Don't use keyboard patterns, sequential numbers, or personal information.
            </p>
            <div className="mt-2 p-2 bg-white dark:bg-gray-800/80 rounded-md border border-emerald-200 dark:border-emerald-900/30 text-sm font-mono ml-11">
              <span className="line-through">qwerty123</span> → <span className="text-emerald-600 dark:text-emerald-400">Q7w#rTy!9</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
