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
export const uploadFile = async (file: File, path: string): Promise<string> => {
	try {
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
	} catch (error) {
		console.error('Error uploading file:', error);
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
            img.onload = () => {
                const canvas = document.createElement('canvas');
                // Resize if too large to save space in Firestore (max 1MB doc size)
                const MAX_WIDTH = 500;
                const scale = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Compress to JPEG 0.7 quality
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                resolve(dataUrl);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};
