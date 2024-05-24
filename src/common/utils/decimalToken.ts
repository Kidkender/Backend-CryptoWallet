export const convertBTCtoValue = (value: string): string => {
  return (Number(value) / 100000000).toString();
};
