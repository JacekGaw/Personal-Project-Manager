import React, { useEffect, useState } from "react";
import Card from "../../components/UI/Card";

const Clock = () => {
  let date = new Date();
  let today = "";
  const [ctime, setTime] = useState();

  useEffect(() => {
    today = date.toLocaleDateString();
    setTime(today);
  }, [date])
  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };

  return (
    <Card className="flex flex-col sm:flex-row p-5 sm:gap-2 items-center justify-center">
      <p className="material-symbols-outlined text-[20px] sm:text-[40px] text-slate-400">calendar_month</p>
      <div className="flex-col  justify-center items-center">
      <p className="text-slate-500 font-[400]">{ctime}</p>
      </div>
    </Card>
  );
};

export default Clock;
