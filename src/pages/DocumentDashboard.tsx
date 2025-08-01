
import { DocumentStats } from "@/components/DocumentStats";
import { DocumentGrid } from "@/components/DocumentGrid";
import { RecentFiles } from "@/components/RecentFiles";

interface DocumentDashboardProps {
  activeView: string;
  searchQuery: string;
}

export const DocumentDashboard = ({ activeView, searchQuery }: DocumentDashboardProps) => {
  return (
    <div className="space-y-12 py-8">
      {activeView === "dashboard" && (
        <>
          {/* Document Statistics */}
          <section>
            <h2 className="text-3xl font-medium text-center mb-4">
              DOCUMENT OVERVIEW
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              A clear, structured view of your document library — across
              financial reports, compliance documents, and governance files.
            </p>
            <DocumentStats />
          </section>

          {/* Recent Activity */}
          <section>
            <RecentFiles />
          </section>
        </>
      )}

      {/* Category-specific views */}
      {activeView !== "dashboard" && (
        <section>
          <DocumentGrid category={activeView} searchQuery={searchQuery} />
        </section>
      )}
    </div>
  );
};
