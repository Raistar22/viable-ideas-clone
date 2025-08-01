
import { Clock, FileText, TrendingUp } from "lucide-react";
import { FileIcon } from "@/components/FileIcon";

interface RecentFile {
  name: string;
  type: string;
  time: string;
  size: string;
}

interface RecentActivityProps {
  files: RecentFile[];
}

export const RecentActivity = ({ files }: RecentActivityProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Latest document updates</p>
        </div>
      </div>

      <div className="space-y-4">
        {files.map((file, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <FileIcon type={file.type} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {file.name}
              </p>
              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{file.time}</span>
                <span>•</span>
                <span>{file.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 p-3 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-xl transition-colors font-medium">
        View all activity
      </button>
    </div>
  );
};
