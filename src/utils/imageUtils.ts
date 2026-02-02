export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const compressImage = (file: File, maxSizeKB: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate dimensions
        let width = img.width;
        let height = img.height;
        const maxDimension = 800;
        
        if (width > maxDimension || height > maxDimension) {
          const ratio = Math.min(maxDimension / width, maxDimension / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Fill white background
        ctx!.fillStyle = '#FFFFFF';
        ctx!.fillRect(0, 0, width, height);
        
        // Draw image
        ctx!.drawImage(img, 0, 0, width, height);
        
        // Convert to Blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas to Blob conversion failed'));
              return;
            }
            
            // Check size
            if (blob.size <= maxSizeKB * 1024) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              // If still too large, try again with lower quality
              canvas.toBlob(
                (smallerBlob) => {
                  if (smallerBlob) {
                    const compressedFile = new File([smallerBlob], file.name, {
                      type: 'image/jpeg',
                      lastModified: Date.now(),
                    });
                    resolve(compressedFile);
                  } else {
                      reject(new Error('Secondary compression failed'));
                  }
                },
                'image/jpeg',
                0.6 // 60% quality
              );
            }
          },
          'image/jpeg',
          0.8 // Initial 80% quality
        );
      };
      
      img.onerror = reject;
    };
    
    reader.onerror = reject;
  });
};

export const createThumbnail = (file: File, width = 100, height = 100): Promise<File> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                ctx!.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(new File([blob], 'thumbnail_' + file.name, { type: 'image/jpeg' }));
                    } else {
                        reject(new Error('Thumbnail creation failed'));
                    }
                }, 'image/jpeg', 0.5);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
};
