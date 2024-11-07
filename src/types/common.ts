export type DateGroupedData = {
  [year: number]: {
    [month: number]: {
      [date: number]: any[];
    };
  };
};

type Year = string;
type Month = string;
type Day = string;
export type DateString = `${Year}-${Month}-${Day}`;
