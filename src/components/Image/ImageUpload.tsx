import React, { useCallback, useState } from 'react';
import { Image, Upload, X, ZoomIn } from 'lucide-react';

interface ImageUploadProps {
  onImagesSelected: (images: File[]) => void;
  selectedImages: File[];
  maxImages?: number;
  maxSize?: number; // in MB
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesSelected,
  selectedImages,
  maxImages = 5,
  maxSize = 10,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff'];
    const maxSizeBytes = maxSize * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      alert('Please upload only JPEG, PNG, WEBP, or TIFF images.');
      return false;
    }

    if (file.size > maxSizeBytes) {
      alert(`File size must be less than ${maxSize}MB.`);
      return false;
    }

    return true;
  };

  const handleFileSelection = useCallback((files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    const remainingSlots = maxImages - selectedImages.length;

    for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
      const file = files[i];
      if (validateFile(file)) {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      onImagesSelected([...selectedImages, ...validFiles]);
    }

    if (files.length > remainingSlots) {
      alert(`You can only upload ${maxImages} images maximum.`);
    }
  }, [selectedImages, maxImages, onImagesSelected]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelection(e.dataTransfer.files);
  }, [handleFileSelection]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelection(e.target.files);
    e.target.value = ''; // Reset input
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    onImagesSelected(newImages);
  };

  const openPreview = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
  };

  const closePreview = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
    }
  };

  return (
    <>
      <div className="relative">
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/tiff"
          onChange={handleFileInputChange}
          className="hidden"
          id="image-upload"
          disabled={selectedImages.length >= maxImages}
        />
        
        <label
          htmlFor="image-upload"
          className={`btn-neon-primary p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            selectedImages.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Upload images"
        >
          <Image size={20} />
        </label>

        {/* Image count indicator */}
        {selectedImages.length > 0 && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
            {selectedImages.length}
          </div>
        )}
      </div>

      {/* Drag & Drop Overlay */}
      {isDragOver && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="glass-panel p-8 text-center space-y-4 max-w-md mx-4">
            <Upload className="mx-auto text-primary" size={48} />
            <div>
              <h3 className="text-xl font-semibold text-primary">Drop Images Here</h3>
              <p className="text-foreground-secondary mt-2">
                Upload medical images for AI analysis
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image Preview */}
      {previewImage && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closePreview}
              className="absolute -top-4 -right-4 btn-neon-primary p-2 rounded-full z-10"
            >
              <X size={20} />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg border border-primary/30"
            />
          </div>
        </div>
      )}
    </>
  );
};