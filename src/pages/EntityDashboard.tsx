import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DocumentCategories } from "@/pages/DocumentCategories";
import { SmartDocumentGrid } from "@/pages/SmartDocumentGrid";

const entityNames: Record<string, string> = {
  "riffle-inc": "Riffle Inc",
  "riffle-studio": "Riffle Studio Private Limited",
  "deo-studios": "Deo Studios",
  "ember-labs": "Ember Labs"
};

export const EntityDashboard = () => {
  const { entity } = useParams<{ entity: string }>();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const entityName = entity ? entityNames[entity] || entity : "Unknown";

  // or "@/pages/EntityDashboard"

// import React from "react";

// export interface EntityDashboardProps {
//   entity: string;
//   onBack: () => void;
// }

// export const EntityDashboard: React.FC<EntityDashboardProps> = ({ entity, onBack }) => {
//   // Your component implementation here
//   return (
//     <div>
//       <button onClick={onBack}>Back</button>
//       <h1>Entity: {entity}</h1>
//       {/* Other dashboard content */}
//     </div>
//   );
// };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <header className="px-8 py-6 border-b border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Entities
              </Button>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-medium text-foreground">{entityName}</h1>
            </div>
          </div>
          
          

          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search documents across all categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base border-border bg-background"
            />
          </div>
        </header>

        <main className="px-8 py-8">
          {!activeCategory ? (
          <DocumentCategories
            entity={entity ?? ""}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
          />
          ) : (
            <SmartDocumentGrid
              entity={entity ?? ""}
              category={activeCategory}
              searchQuery={searchQuery}
              onBack={() => setActiveCategory(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default EntityDashboard;
