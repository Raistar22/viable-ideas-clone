
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

interface Insight {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: string;
}

interface QuickInsightsProps {
  insights: Insight[];
}

export const QuickInsights = ({ insights }: QuickInsightsProps) => {
  const getColorClasses = (color: string, trend: string) => {
    const colorMap = {
      emerald: {
        bg: "bg-emerald-50 dark:bg-emerald-950/50",
        icon: "text-emerald-600 dark:text-emerald-400",
        trend: trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
      },
      blue: {
        bg: "bg-blue-50 dark:bg-blue-950/50",
        icon: "text-blue-600 dark:text-blue-400",
        trend: trend === "up" ? "text-blue-600 dark:text-blue-400" : "text-red-500 dark:text-red-400"
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-950/50",
        icon: "text-purple-600 dark:text-purple-400",
        trend: trend === "up" ? "text-purple-600 dark:text-purple-400" : "text-red-500 dark:text-red-400"
      },
      amber: {
        bg: "bg-amber-50 dark:bg-amber-950/50",
        icon: "text-amber-600 dark:text-amber-400",
        trend: trend === "up" ? "text-amber-600 dark:text-amber-400" : "text-red-500 dark:text-red-400"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {insights.map((insight, index) => {
        const Icon = insight.icon;
        const TrendIcon = insight.trend === "up" ? TrendingUp : TrendingDown;
        const colors = getColorClasses(insight.color, insight.trend);
        
        return (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${colors.icon}`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${colors.trend}`}>
                <TrendIcon className="w-4 h-4" />
                <span>{insight.change}</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{insight.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{insight.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
