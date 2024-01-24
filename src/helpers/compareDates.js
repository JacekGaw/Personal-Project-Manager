export const compareDates = (toCompared, compared) => {
  toCompared = new Date(toCompared).toISOString().split("T")[0];
  compared = new Date(compared).toISOString().split("T")[0];
  console.log(toCompared);
  console.log(compared);

  if (toCompared < compared) {
    return -1;
  } else if (toCompared > compared) {
    return 1;
  } else if (toCompared == compared) return 0;
};
