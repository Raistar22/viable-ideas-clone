
import { FileText, Shield, Users, Archive } from "lucide-react";

interface DocumentNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigation = [
  { id: "dashboard", name: "All Documents", icon: FileText },
  { id: "financial", name: "Financial", icon: Archive },
  { id: "compliance", name: "Compliance", icon: Shield },
  { id: "governance", name: "Governance", icon: Users },
];

export const DocumentNav = ({ activeView, onViewChange }: DocumentNavProps) => {
  return (
    <nav className="px-8 py-6 border-b border-border">
      <div className="flex space-x-8">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                isActive 
                  ? "bg-muted text-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
