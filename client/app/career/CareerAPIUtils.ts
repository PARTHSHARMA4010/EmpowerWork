// src/lib/career/CareerAPIUtils.ts
export const CareerAPIUtils = {
    fileToBase64: (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },
  
    getFileExtension: (fileName: string): string => {
      const parts = fileName.split(".");
      return parts[parts.length - 1];
    },
  };
  