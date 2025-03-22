import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Project } from '../types';

export const fetchProjects = createAsyncThunk<Project[],void, { rejectValue: string }>(
	'projects/fetchProjects',
	async (_, { rejectWithValue }) => {
		try {
			const projectsCollection = collection(db, 'projects'); // Reference to the 'projects' collection
			const projectsSnapshot = await getDocs(projectsCollection);
			const projectsList = projectsSnapshot.docs.map((doc) => ({
				id: doc.id, 
				...(doc.data() as Project), 
			}));
			return projectsList;
		} catch (error: any) {
			console.error('Error fetching projects:', error);
			return rejectWithValue(error.message || 'Failed to fetch projects');
		}
	},
);