import { useEffect, useState } from "react";

export type TotalCashFlowDataI = {
  month: string;
  in: number;
  out: number;
};

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
export const useTotalCashFlowData = (month: number) => {
  const [data, setData] = useState<TotalCashFlowDataI[]>([]);

  const newData = months.map((month) => {
    const inData = Math.floor(Math.random() * 90) + 10;
    const outData = Math.floor(Math.random() * inData) + 5;
    return {
      month,
      in: inData,
      out: outData,
    };
  });
 
  useEffect(() => {
    setData(newData);
  }, [month]);

  return data;
};
