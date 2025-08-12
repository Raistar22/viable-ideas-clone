import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Folder, FileText, Download, ExternalLink } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface DriveItem {
  id: string;
  name: string;
  mimeType: string;
  type: 'folder' | 'file';
  webViewLink?: string;
  parents?: string[];
}

const GOOGLE_DRIVE_API_KEY = 'AIzaSyD8YourAPIKeyHere'; // You'll need to replace this with your actual API key

const DriveFolder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPath, setCurrentPath] = useState<DriveItem[]>([]);
  const [currentItems, setCurrentItems] = useState<DriveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const title = searchParams.get('title') || 'Drive Folder';
  const driveUrl = searchParams.get('url') || '';

  // Extract folder ID from Google Drive URL
  const extractFolderIdFromUrl = (url: string): string => {
    const match = url.match(/\/folders\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : '';
  };

  // Get current folder ID
  const getCurrentFolderId = (): string => {
    if (currentPath.length > 0) {
      return currentPath[currentPath.length - 1].id;
    }
    return extractFolderIdFromUrl(driveUrl);
  };

  // Fetch folder contents from Google Drive API
  const fetchFolderContents = async (folderId: string): Promise<DriveItem[]> => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?` +
        `q='${folderId}'+in+parents` +
        `&key=${GOOGLE_DRIVE_API_KEY}` +
        `&fields=files(id,name,mimeType,webViewLink,parents)`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch folder contents');
      }

      const data = await response.json();
      
      return data.files.map((file: any) => ({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        type: file.mimeType === 'application/vnd.google-apps.folder' ? 'folder' : 'file',
        webViewLink: file.webViewLink,
        parents: file.parents
      }));
    } catch (err) {
      console.error('Error fetching folder contents:', err);
      throw err;
    }
  };

  useEffect(() => {
    const loadFolderContents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const folderId = getCurrentFolderId();
        if (!folderId) {
          throw new Error('Invalid folder URL');
        }
        
        const items = await fetchFolderContents(folderId);
        setCurrentItems(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load folder contents');
        // Fallback to demo data if API fails
        setCurrentItems([
          {
            id: 'demo-1',
            name: 'Documents',
            mimeType: 'application/vnd.google-apps.folder',
            type: 'folder',
            webViewLink: driveUrl
          },
          {
            id: 'demo-2',
            name: 'Sample File.pdf',
            mimeType: 'application/pdf',
            type: 'file',
            webViewLink: driveUrl
          },
          {
            id: 'demo-3',
            name: 'Images',
            mimeType: 'application/vnd.google-apps.folder', 
            type: 'folder',
            webViewLink: driveUrl
          },
          {
            id: 'demo-4',
            name: 'Spreadsheet.xlsx',
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            type: 'file',
            webViewLink: driveUrl
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadFolderContents();
  }, [currentPath, driveUrl]);

  const navigateToFolder = async (folder: DriveItem) => {
    if (folder.type === 'folder') {
      setCurrentPath([...currentPath, folder]);
      setLoading(true);
      
      try {
        const items = await fetchFolderContents(folder.id);
        setCurrentItems(items);
      } catch (err) {
        setError('Failed to load folder contents');
      } finally {
        setLoading(false);
      }
    } else {
      // Open file in new tab
      if (folder.webViewLink) {
        window.open(folder.webViewLink, '_blank');
      }
    }
  };

  const navigateBack = async () => {
    if (currentPath.length > 0) {
      const newPath = [...currentPath];
      newPath.pop();
      setCurrentPath(newPath);
      
      if (newPath.length === 0) {
        // Go back to root folder
        const folderId = extractFolderIdFromUrl(driveUrl);
        setLoading(true);
        try {
          const items = await fetchFolderContents(folderId);
          setCurrentItems(items);
        } catch (err) {
          setError('Failed to load folder contents');
        } finally {
          setLoading(false);
        }
      } else {
        // Go back to parent folder
        const parentFolder = newPath[newPath.length - 1];
        setLoading(true);
        try {
          const items = await fetchFolderContents(parentFolder.id);
          setCurrentItems(items);
        } catch (err) {
          setError('Failed to load folder contents');
        } finally {
          setLoading(false);
        }
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
          {error && (
            <div className="ml-auto text-sm text-destructive bg-destructive/10 px-3 py-1 rounded">
              API Key Required - Using Demo Data
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading folder contents...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentItems.map((item) => (
              <Card 
                key={item.id}
                className={`cursor-pointer hover:shadow-lg transition-shadow duration-200 border-border ${
                  item.type === 'folder' ? 'hover:bg-muted/50' : ''
                }`}
                onClick={() => navigateToFolder(item)}
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
                    {item.type === 'file' && item.webViewLink && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-70 hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(item.webViewLink, '_blank');
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && currentItems.length === 0 && (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Empty Folder</h3>
            <p className="text-muted-foreground">This folder doesn't contain any files or subfolders.</p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-medium text-foreground mb-2">Setup Google Drive API</h3>
            <p className="text-sm text-muted-foreground mb-3">
              To connect to your actual Google Drive folder, you need to:
            </p>
            <ol className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>1. Go to Google Cloud Console</li>
              <li>2. Enable Google Drive API</li>
              <li>3. Create an API key</li>
              <li>4. Replace the API key in the code</li>
            </ol>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3"
              onClick={() => window.open('https://console.cloud.google.com/', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Google Cloud Console
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriveFolder;