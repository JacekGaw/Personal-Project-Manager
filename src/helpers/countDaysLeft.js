export const countDaysLeft = (toCount) => {
    
    toCount = new Date(toCount);
    const compared = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    let diffDays = Math.round((toCount - compared) / oneDay)+1;

    return diffDays;
  };