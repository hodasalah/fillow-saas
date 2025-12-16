import { collection, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';

export interface NotificationItem {
    id: string;
    icon: any; // string (url/text) or IconDefinition (if mapped)
    title: string;
    time: string;
    background?: string;
    color?: string;
}

export const fetchNotifications = async (): Promise<NotificationItem[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'notifications'));
        const notifications = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data
            } as NotificationItem;
        });

        if (notifications.length === 0) {
            console.warn('No notifications found in DB, falling back to mock');
            // Fallback mock data
            return [
                {
                    id: uuidv4(),
                    icon: '/assets/1.jpg',
                    title: 'Dr sultads Send you Photo',
                    time: '29 July 2020 - 02:26 PM',
                },
                {
                    id: uuidv4(),
                    icon: 'KG',
                    title: 'Resport created successfully',
                    time: '29 July 2020 - 02:26 PM',
                    background: '#fbeff9',
                    color: '#D653C1',
                },
                {
                    id: uuidv4(),
                    icon: '/assets/1.jpg', // Replaced IconDefinition with image/text for simplicity in fallback if types clash
                    title: 'Reminder : Treatment Time!',
                    time: '29 July 2020 - 02:26 PM',
                    background: '#d7fde2',
                    color: '#09BD3C',
                },
                {
                    id: uuidv4(),
                    icon: '/assets/1.jpg',
                    title: 'Dr sultads Send you Photo',
                    time: '29 July 2020 - 02:26 PM',
                },
                {
                    id: uuidv4(),
                    icon: 'KG',
                    title: 'Resport created successfully',
                    time: '29 July 2020 - 02:26 PM',
                    background: '#ffedf0',
                    color: '#FC2E53',
                },
            ];
        }
        return notifications;
    } catch (error) {
        console.warn('Error fetching notifications:', error);
         return [
            {
                id: uuidv4(),
                icon: '/assets/1.jpg',
                title: 'Dr sultads Send you Photo',
                time: '29 July 2020 - 02:26 PM',
            },
            {
                id: uuidv4(),
                icon: 'KG',
                title: 'Resport created successfully',
                time: '29 July 2020 - 02:26 PM',
                background: '#fbeff9',
                color: '#D653C1',
            },
        ];
    }
};
