import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImprovementSuggestions() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
          <Wand2 className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
          Improvement Suggestions
        </h3>
        <Button
          variant="link"
          size="sm"
          onClick={toggleVisibility}
          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-0 h-auto"
        >
          {isVisible ? 'Hide suggestions' : 'Show suggestions'}
        </Button>
      </div>
      
      {isVisible && (
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 text-sm">Use a passphrase</h4>
            <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
              Combine 4+ random words for a strong, memorable password.
            </p>
            <p className="mt-2 p-1 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-700 text-xs font-mono">
              correct-horse-battery-staple
            </p>
          </div>
          
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
            <h4 className="font-medium text-purple-800 dark:text-purple-300 text-sm">Add complexity wisely</h4>
            <p className="text-xs text-purple-700 dark:text-purple-400 mt-1">
              Replace letters with similar-looking numbers or symbols.
            </p>
            <p className="mt-2 p-1 bg-white dark:bg-gray-800 rounded border border-purple-200 dark:border-purple-700 text-xs font-mono">
              p@$$w0rd → P@$$w0rd_2023!
            </p>
          </div>
          
          <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-100 dark:border-teal-800">
            <h4 className="font-medium text-teal-800 dark:text-teal-300 text-sm">Avoid patterns</h4>
            <p className="text-xs text-teal-700 dark:text-teal-400 mt-1">
              Don't use keyboard patterns, sequential numbers, or repeated characters.
            </p>
            <p className="mt-2 p-1 bg-white dark:bg-gray-800 rounded border border-teal-200 dark:border-teal-700 text-xs font-mono">
              <span className="line-through">qwerty123</span> → <span className="text-green-600 dark:text-green-400">Q7w#rTy!9</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
