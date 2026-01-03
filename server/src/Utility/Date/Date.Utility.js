export const formatDate = (date = new Date()) =>
  new Date(date).toISOString().split("T")[0];

export const now = () => new Date();

export const addDays = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};
