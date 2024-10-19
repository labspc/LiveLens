import React, { useState, useCallback } from 'react';
import LivePhoto from './components/LivePhoto';
import { Upload } from 'lucide-react';

function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'image/heic' || file.type === 'image/heif') {
        // Handle HEIC/HEIF files
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          // Here you would use a library like heic2any to convert HEIC to JPEG
          // For this example, we'll just use a placeholder
          setImageUrl('https://via.placeholder.com/300x300.jpg?text=HEIC+Image');
        };
        reader.readAsArrayBuffer(file);
      } else if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setImageUrl(URL.createObjectURL(file));
      } else if (file.type === 'video/quicktime' || file.type === 'video/mp4') {
        setVideoUrl(URL.createObjectURL(file));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Live Photo Viewer</h1>
      {imageUrl && videoUrl ? (
        <LivePhoto imageUrl={imageUrl} videoUrl={videoUrl} />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            <Upload size={48} className="text-blue-500 mb-4" />
            <span className="text-lg font-semibold">Upload Live Photo</span>
            <span className="text-sm text-gray-500 mt-2">
              Supports HEIC, JPEG, PNG for images and MOV, MP4 for videos
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/heic,image/heif,image/jpeg,image/png,video/quicktime,video/mp4"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}
      <footer className="mt-8 text-gray-500 text-center">
        <p>&copy; 2024 Live Photo Viewer. All rights reserved. </p>
        <p>Made with ❤️ by Lambert</p>
      </footer>
    </div>
  );
}

export default App;