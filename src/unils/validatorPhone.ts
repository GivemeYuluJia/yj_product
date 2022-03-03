export const validatorPhone = (
  rule: any,
  value: string[],
  callback: (message?: string) => void,
) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }
  if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value[1]) || !value[1]) {
    callback('Please input your phone number!');
  }
  callback();
};
