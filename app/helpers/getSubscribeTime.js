const setSubscribeTime = (months) => {
  const now = new Date();
  now.setMonth(now.getMonth() + months);
  return now.getTime();
};

const getLeftTime = (time) => {
  const now = Date.now();
  const diffMs = time - now;

  const msInHour = 1000 * 60 * 60;
  const msInDay = msInHour * 24;

  const days = Math.floor(diffMs / msInDay);
  const hours = Math.floor((diffMs % msInDay) / msInHour);

  return { days, hours };
};

export { setSubscribeTime, getLeftTime };
