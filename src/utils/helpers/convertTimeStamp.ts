import { Timestamp } from 'firebase/firestore';

export const convertTimestamp = (field: any) =>
	field instanceof Timestamp ? field.toDate().toISOString() : field;
