import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DriveDashboard = () => {
  const navigate = useNavigate();

  const driveCards = [
    {
      id: 1,
      title: "Project Documents",
      description: "Main project files and documentation",
      driveUrl: "https://drive.google.com/drive/folders/1Ul2B1VF-wdm9bG295hWDJPx_XvQDKTEc?usp=sharing"
    },
    {
      id: 2,
      title: "Financial Reports", 
      description: "Budget reports and financial data",
      driveUrl: "https://drive.google.com/drive/folders/1Ul2B1VF-wdm9bG295hWDJPx_XvQDKTEc?usp=sharing"
    },
    {
      id: 3,
      title: "Team Resources",
      description: "Team documents and shared resources", 
      driveUrl: "https://drive.google.com/drive/folders/1Ul2B1VF-wdm9bG295hWDJPx_XvQDKTEc?usp=sharing"
    },
    {
      id: 4,
      title: "Client Materials",
      description: "Client presentations and contracts",
      driveUrl: "https://drive.google.com/drive/folders/1Ul2B1VF-wdm9bG295hWDJPx_XvQDKTEc?usp=sharing"
    }
  ];

  const handleCardClick = (driveUrl: string, title: string) => {
    navigate(`/drive-folder?url=${encodeURIComponent(driveUrl)}&title=${encodeURIComponent(title)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Drive Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {driveCards.map((card) => (
            <Card 
              key={card.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-border"
              onClick={() => handleCardClick(card.driveUrl, card.title)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FolderOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                    <CardDescription className="mt-1">{card.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Open Drive Folder
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriveDashboard;