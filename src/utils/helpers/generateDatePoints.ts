// Helper function to generate data points based on startDate and endDate.
  // This example creates one data point per month with a dummy completion value.

import { DataPoint } from '../../layout/dashboard/pages/home/completeProject/EditProjectForm';

export const  generateDataPoints = (start: string, end: string): DataPoint [] => {
    const points: DataPoint[] = [];
    const startDate = new Date(start);
    const endDate = new Date(end);

    // If startDate is after endDate, return an empty array (or handle appropriately)
    if (startDate > endDate) return points;

    // Loop from start to end date by month
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      // Format the date as YYYY-MM-DD
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      // Set a dummy completion value; you could calculate a value if needed
      points.push({
        date: formattedDate,
        completion: Math.floor(Math.random() * 100),
      });

      // Advance currentDate to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return points;
  };