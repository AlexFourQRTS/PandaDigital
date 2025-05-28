import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, Image, Music, Video, File } from "lucide-react";
import { formatFileSize } from "@/lib/utils";
import type { MediaFile } from "@shared/schema";

interface FileCardProps {
  file: MediaFile;
  onDelete?: (id: number) => void;
}

export default function FileCard({ file, onDelete }: FileCardProps) {
  const getFileIcon = (mediaType: string, mimeType: string) => {
    switch (mediaType) {
      case "photo":
        return <Image className="h-8 w-8 text-blue-500" />;
      case "video":
        return <Video className="h-8 w-8 text-purple-500" />;
      case "audio":
        return <Music className="h-8 w-8 text-green-500" />;
      case "document":
        if (mimeType.includes("pdf")) {
          return <FileText className="h-8 w-8 text-red-500" />;
        } else if (mimeType.includes("text")) {
          return <FileText className="h-8 w-8 text-gray-500" />;
        } else {
          return <File className="h-8 w-8 text-panda-orange-500" />;
        }
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toUpperCase() || 'FILE';
  };

  const handleDownload = () => {
    window.open(`/api/media/download/${file.id}`, '_blank');
  };

  const canPreview = (mediaType: string, mimeType: string) => {
    return mediaType === "photo" || 
           mediaType === "video" || 
           mediaType === "audio" ||
           mimeType.includes("pdf") ||
           mimeType.includes("text");
  };

  const handlePreview = () => {
    if (file.mediaType === "photo" || file.mediaType === "video" || file.mediaType === "audio") {
      window.open(`/api/media/file/${file.fileName}`, '_blank');
    } else if (file.mimeType.includes("pdf") || file.mimeType.includes("text")) {
      window.open(`/api/media/file/${file.fileName}`, '_blank');
    }
  };

  return (
    <Card className="bg-card border-border hover:bg-muted/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {getFileIcon(file.mediaType, file.mimeType)}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-card-foreground truncate">
              {file.originalName}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {getFileExtension(file.originalName)}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatFileSize(file.fileSize)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(file.uploadedAt || '').toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            {canPreview(file.mediaType, file.mimeType) && (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreview}
                className="text-xs"
              >
                Preview
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>

            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(file.id)}
                className="text-xs"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}