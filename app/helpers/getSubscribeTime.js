export default function (months) {
  const now = new Date();
  now.setMonth(now.getMonth() + months);
  return now.getTime();
}
