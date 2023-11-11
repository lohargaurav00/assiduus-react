import * as React from "react";

export type AccountTableDataI = {
  account: string;
  thisMonth: number;
  ytd: number;
}[];

const generateRandomData = (min: number, max: number) => {
  const digits = 2;
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(digits));
};

const rowsData: AccountTableDataI = [
  {
    account: "sales",
    thisMonth: 4000,
    ytd: 24000,
  },
  {
    account: "advertising",
    thisMonth: 2000,
    ytd: 12000,
  },
  {
    account: "inventory",
    thisMonth: 4000.5,
    ytd: 24000.78,
  },
  {
    account: "entertainment",
    thisMonth: 1105.79,
    ytd: 12000.78,
  },
  {
    account: "product",
    thisMonth: 4652.1,
    ytd: 2592.9,
  },
];

export const useAccountTableData = (month: number) => {
  const [accountTableData, setAccountTableData] =
    React.useState<AccountTableDataI>(rowsData);

  const accounts = [
    "sales",
    "advertising",
    "inventory",
    "entertainment",
    "product",
  ];

  const data = accounts.map((account) => {
    return {
      account,
      thisMonth: generateRandomData(0, 15000),
      ytd: generateRandomData(0, 10000),
    };
  });

  React.useEffect(() => {
    setAccountTableData(data);
  }, [month]);

  return accountTableData;
};
