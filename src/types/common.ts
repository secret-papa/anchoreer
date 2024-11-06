export type DateGroupedData = {
  [year: number]: {
    [month: number]: {
      [date: number]: any[];
    };
  };
};
