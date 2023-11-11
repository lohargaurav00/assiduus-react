import { useEffect, useState } from "react";
import * as d3 from "d3";

export type InvoicesWeekDataI = {
  date: string;
  value: number;
};

export const useInvoicesWeekData = (month: number) => {
  const [data, setData] = useState<InvoicesWeekDataI[]>([]);

  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, month, 1);
  const endDate = new Date(currentYear, month + 1, 0);

  const weeks = d3.timeWeeks(startDate, endDate);

  const weekData = weeks.map((week, index) => {
    const weekStart = d3.timeFormat("%b %d")(week);
    const weekEndDate = d3.timeFormat("%d")(d3.timeDay.offset(week, 6));
    return {
      date: `${weekStart}-${weekEndDate}`,
      value: Math.floor(Math.random() * 90) + 10,
    };
  });

  const olderAndFutureWeeks = [
    {
      date: "Older",
      value: Math.floor(Math.random() * 90) + 10,
    },
    ...weekData,
    {
      date: "Future",
      value: Math.floor(Math.random() * 90) + 10,
    },
  ];

  useEffect(() => {
    setData(olderAndFutureWeeks);
  }, [month]);

  return data;
};
