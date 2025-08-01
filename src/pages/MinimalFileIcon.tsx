import { FileText, FileSpreadsheet, FileImage, Archive, Video, Music, Code } from "lucide-react";

interface MinimalFileIconProps {
  type: string;
  size?: "sm" | "md" | "lg";
}

export const MinimalFileIcon = ({ type, size = "md" }: MinimalFileIconProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  const getIconAndColor = (fileType: string) => {
    const normalizedType = fileType.toLowerCase();
    
    if (normalizedType.includes('pdf')) {
      return { icon: FileText, color: "text-gray-600" };
    }
    if (normalizedType.includes('excel') || normalizedType.includes('xls') || normalizedType.includes('csv')) {
      return { icon: FileSpreadsheet, color: "text-green-600" };
    }
    if (normalizedType.includes('word') || normalizedType.includes('doc')) {
      return { icon: FileText, color: "text-blue-600" };
    }
    if (normalizedType.includes('image') || normalizedType.includes('png') || normalizedType.includes('jpg') || normalizedType.includes('jpeg')) {
      return { icon: FileImage, color: "text-purple-600" };
    }
    if (normalizedType.includes('zip') || normalizedType.includes('rar')) {
      return { icon: Archive, color: "text-orange-600" };
    }
    if (normalizedType.includes('video') || normalizedType.includes('mp4')) {
      return { icon: Video, color: "text-red-600" };
    }
    if (normalizedType.includes('audio') || normalizedType.includes('mp3')) {
      return { icon: Music, color: "text-pink-600" };
    }
    if (normalizedType.includes('code') || normalizedType.includes('js') || normalizedType.includes('html')) {
      return { icon: Code, color: "text-indigo-600" };
    }
    
    return { icon: FileText, color: "text-gray-600" };
  };

  const { icon: Icon, color } = getIconAndColor(type);

  return (
    <div className="flex items-center justify-center">
      <Icon className={`${sizeClasses[size]} ${color}`} />
    </div>
  );
};