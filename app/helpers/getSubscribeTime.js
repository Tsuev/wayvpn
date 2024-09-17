export default function (months) {
  let now = new Date();
  now.setMonth(now.getMonth() + months);
  return now.getTime();
}
