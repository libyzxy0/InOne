import React, { useRef } from 'react';

interface FileUploadProps {
  onUploadResponse: (response: { file_url: string | null; error: string | null }) => void;
  children: React.ReactNode;
  onUploadStart: () => void; 
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadResponse, children, onUploadStart }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        onUploadStart();
        
        const response = await fetch('https://libyzxy0.serv00.net/upload.php', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        onUploadResponse({
          file_url: `https://libyzxy0.serv00.net/get_file.php?file=${result.filename}`,
          error: null
        });
      } catch (error) {
        console.error('File upload error:', error);
        onUploadResponse({ file_url: null, error: 'Error uploading file' });
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div onClick={handleButtonClick}>
        {children}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;