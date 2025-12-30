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
 * Upload a profile picture for a specific user
 * @param userId The UID of the user
 * @param file The image file to upload
 * @returns The download URL
 */
export const uploadProfilePicture = async (userId: string, file: File): Promise<string> => {
    // Standardize path: avatars/{userId}/{filename}
    // We can also just use 'avatars/{userId}' if we want to overwrite
    const extension = file.name.split('.').pop();
    const fileName = `avatar.${extension}`;
    const path = `avatars/${userId}/${fileName}`;
    return uploadFile(file, path);
};
