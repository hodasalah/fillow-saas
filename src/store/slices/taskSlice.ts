import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';


export const updateUserProgress = createAsyncThunk(
	'tasks/updateUserProgress',
	async ({ projectId, taskId, progress, userId }: { projectId: string, taskId: string, progress: number, userId: string }, { rejectWithValue }) => {
		try {
			const taskRef = doc(db, `projects/${projectId}/tasks/${taskId}`);
			await updateDoc(taskRef, {
				[`userProgress.${userId}`]: {
					percentage: progress,
					lastUpdated: new Date().toISOString(),
				},
			});
			return { projectId, taskId, userId, progress };
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('An unknown error occurred');
		}
	},
);
