export const checkPassword = (password) => {
  let regex = password.match(/(?=.[a-zA-Z])(?=.\d)(?=.*[@#$?_%!]).{8,20}/);
  return regex !== null;
};