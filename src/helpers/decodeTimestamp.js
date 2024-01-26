import { Timestamp } from "firebase/firestore";

export const decodeTimestamp = (dateObj) => {
  if (dateObj) {
    let timeStamp = new Timestamp(dateObj.seconds, dateObj.nanoseconds);
    timeStamp = timeStamp.toDate();
    return timeStamp;
  }
  else return null;
};
