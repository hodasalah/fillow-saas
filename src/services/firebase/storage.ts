import {
    getDownloadURL,
    ref,
    uploadBytes
} from 'firebase/storage';
import { storage } from '../../firebase';

/**
 * Upload a file to Firebase Storage
 * @param file The file to upload
 * @param path The path in storage (e.g., 'profiles/userid/avatar.jpg')
 * @returns The download URL of the uploaded file
 */
/**
 * Upload a file to Firebase Storage
 * @param data The file or blob to upload
 * @param path The path in storage (e.g., 'profiles/userid/avatar.jpg')
 * @returns The download URL of the uploaded file
 */
export const uploadFile = async (data: Blob | File, path: string): Promise<string> => {
	try {
        const storageRef = ref(storage, path);
        // Add explicit content type if it exists on the data
        const metadata = (data as any).type ? { contentType: (data as any).type } : undefined;
        
        const snapshot = await uploadBytes(storageRef, data, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
	} catch (error) {
		console.error('Error uploading file to Firebase Storage:', error);
		throw error;
	}
};

/**
 * Compress and convert image to Base64 (bypassing Storage)
 * @param file The image file
 * @returns Base64 string
 */
export const uploadProfilePicture = async (userId: string, file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = async () => {
                const canvas = document.createElement('canvas');
                // Resize if too large
                const MAX_WIDTH = 500;
                const scale = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Convert to Blob and upload to Storage
                canvas.toBlob(async (blob) => {
                    if (!blob) {
                        reject(new Error('Failed to create blob from canvas'));
                        return;
                    }
                    try {
                        const path = `profiles/${userId}/avatar.jpg`;
                        const downloadURL = await uploadFile(blob as File, path);
                        resolve(downloadURL);
                    } catch (error) {
                        reject(error);
                    }
                }, 'image/jpeg', 0.8);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};
