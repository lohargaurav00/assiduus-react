import { useCallback, useEffect, useState } from "react";

export type Data = {
  date: Date;
  value: number;
}[];

export const useDataWithMonth = (month?: number) => {
  const [LinechartData, setLinechartData] = useState<Data>([]);

  const currentDate = new Date();
  const currentMonth = month ? month : currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get the last day of the month

  const data: Data = Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(currentYear, currentMonth, index + 1);
    const value = Math.floor(Math.random() * 90) + 10; // Generate a random value less than 100
    return { date, value };
  });

  useEffect(() => {
    setLinechartData(data);
  }, [month]);

  return LinechartData;
};
