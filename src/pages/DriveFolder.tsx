import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Folder, FileText, Download } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface DriveItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  url?: string;
  children?: DriveItem[];
}

const DriveFolder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPath, setCurrentPath] = useState<DriveItem[]>([]);
  const [currentItems, setCurrentItems] = useState<DriveItem[]>([]);
  const title = searchParams.get('title') || 'Drive Folder';

  // Mock drive structure - in real app, this would come from Google Drive API
  const mockDriveStructure: DriveItem[] = [
    {
      id: '1',
      name: 'Documents',
      type: 'folder',
      children: [
        {
          id: '1-1',
          name: 'Reports',
          type: 'folder',
          children: [
            { id: '1-1-1', name: 'Annual Report 2024.pdf', type: 'file', url: '#' },
            { id: '1-1-2', name: 'Monthly Summary.xlsx', type: 'file', url: '#' }
          ]
        },
        { id: '1-2', name: 'Meeting Notes.docx', type: 'file', url: '#' },
        { id: '1-3', name: 'Project Plan.pdf', type: 'file', url: '#' }
      ]
    },
    {
      id: '2',
      name: 'Images',
      type: 'folder',
      children: [
        { id: '2-1', name: 'Logo.png', type: 'file', url: '#' },
        { id: '2-2', name: 'Screenshots', type: 'folder', children: [] }
      ]
    },
    {
      id: '3',
      name: 'Shared Files',
      type: 'folder',
      children: [
        { id: '3-1', name: 'Team Handbook.pdf', type: 'file', url: '#' },
        { id: '3-2', name: 'Style Guide.pdf', type: 'file', url: '#' }
      ]
    },
    { id: '4', name: 'README.txt', type: 'file', url: '#' }
  ];

  useEffect(() => {
    setCurrentItems(mockDriveStructure);
  }, []);

  const navigateToFolder = (folder: DriveItem) => {
    if (folder.type === 'folder' && folder.children) {
      setCurrentPath([...currentPath, folder]);
      setCurrentItems(folder.children);
    }
  };

  const navigateBack = () => {
    if (currentPath.length > 0) {
      const newPath = [...currentPath];
      newPath.pop();
      setCurrentPath(newPath);
      
      if (newPath.length === 0) {
        setCurrentItems(mockDriveStructure);
      } else {
        const parentFolder = newPath[newPath.length - 1];
        setCurrentItems(parentFolder.children || []);
      }
    } else {
      navigate('/drive-dashboard');
    }
  };

  const getCurrentPathName = () => {
    if (currentPath.length === 0) return title;
    return currentPath.map(p => p.name).join(' / ');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={navigateBack}
            className="hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">{getCurrentPathName()}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentItems.map((item) => (
            <Card 
              key={item.id}
              className={`cursor-pointer hover:shadow-lg transition-shadow duration-200 border-border ${
                item.type === 'folder' ? 'hover:bg-muted/50' : ''
              }`}
              onClick={() => item.type === 'folder' ? navigateToFolder(item) : window.open(item.url, '_blank')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    {item.type === 'folder' ? (
                      <Folder className="w-5 h-5 text-primary" />
                    ) : (
                      <FileText className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-foreground truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {item.type === 'folder' ? 'Folder' : 'File'}
                    </p>
                  </div>
                  {item.type === 'file' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(item.url, '_blank');
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {currentItems.length === 0 && (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Empty Folder</h3>
            <p className="text-muted-foreground">This folder doesn't contain any files or subfolders.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriveFolder;