import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Building2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DocumentCategories } from "@/pages/DocumentCategories";
import { SmartDocumentGrid } from "@/pages/SmartDocumentGrid";
import axios from "axios";

// Entity name to display name map
const entityNames: Record<string, string> = {
  "riffle-inc": "Riffle Inc",
  "riffle-studio": "Riffle Studio Private Limited",
  "deo-studios": "Deo Studios",
  "ember-labs": "Ember Labs",
};

// Entity to Google Drive folder ID map
const entityFolderMap: Record<string, string> = {
  "riffle-inc": "1AMxeRBk55wfAGo5Mq4n7x4km3TOYRaIh",
  "riffle-studio": "1KYGt25d4mlESr_t3VeesjwMmMeMIl_SL",
  "deo-studios": "1b56ukUDvG1GDM5xzeuXA2BdUThzvBffH",
  "ember-labs": "1Sh0u9zUnwI1dZKdFmb7OOxW48QMRWGYP",
};

type DriveFile = {
  id: string;
  name: string;
  webViewLink: string;
};

export const EntityDashboard = () => {
  const { entity } = useParams<{ entity: string }>();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [driveError, setDriveError] = useState<string | null>(null);

  const entityName = entity ? entityNames[entity] || entity : "Unknown";
  const folderId = entity ? entityFolderMap[entity] : null;

  useEffect(() => {
    const fetchDriveFiles = async () => {
      if (!folderId) return;
      try {
        setLoadingFiles(true);
        setDriveError(null);
        const response = await axios.get(`/api/drive/files?folderId=${folderId}`);
        setDriveFiles(response.data.files || []);
      } catch (error) {
        console.error("Drive fetch error:", error);
        setDriveError("Failed to fetch files from Drive. Please try again.");
      } finally {
        setLoadingFiles(false);
      }
    };

    fetchDriveFiles();
  }, [folderId]);

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
            <>
              <DocumentCategories
                entity={entity ?? ""}
                onSelectCategory={setActiveCategory}
                searchQuery={searchQuery}
              />

              {/* Google Drive Files */}
              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Drive Files</h2>
                {loadingFiles ? (
                  <p>Loading files...</p>
                ) : driveError ? (
                  <p className="text-red-500">{driveError}</p>
                ) : driveFiles.length === 0 ? (
                  <p>No files found in the folder.</p>
                ) : (
                  <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {driveFiles.map((file) => (
                      <li
                        key={file.id}
                        className="p-4 border border-muted rounded-lg hover:shadow transition"
                      >
                        <a
                          href={file.webViewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2"
                        >
                          <FileText className="text-primary" />
                          <span className="truncate">{file.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
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
