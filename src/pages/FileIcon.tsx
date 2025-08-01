
import { FileText, FileSpreadsheet, File, Image, Video, Music } from "lucide-react";

interface FileIconProps {
  type: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const FileIcon = ({ type, size = "md", className = "" }: FileIconProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };

  const getIconAndColor = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return { icon: FileText, color: "text-red-400" };
      case "excel":
      case "xlsx":
      case "xls":
        return { icon: FileSpreadsheet, color: "text-green-400" };
      case "word":
      case "docx":
      case "doc":
        return { icon: FileText, color: "text-blue-400" };
      case "image":
      case "jpg":
      case "png":
      case "gif":
        return { icon: Image, color: "text-purple-400" };
      case "video":
      case "mp4":
      case "avi":
        return { icon: Video, color: "text-pink-400" };
      case "audio":
      case "mp3":
      case "wav":
        return { icon: Music, color: "text-yellow-400" };
      default:
        return { icon: File, color: "text-slate-400" };
    }
  };

  const { icon: Icon, color } = getIconAndColor(type);

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]} ${color} ${className}`}>
      <Icon className="w-full h-full" />
    </div>
  );
};
