import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const UniversalDatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="border flex border-gray-500  w-full px-8 border-4 rounded-lg text-xl h1 text-bold">
      <DatePicker
        className={" h-[4rem] outline-none"}
        selected={startDate}
        onChange={(date: any) => setStartDate(date)}
      />
      <div className="border-l border-2 border-gray-500"></div>
      <input
        aria-label="Time"
        className="self-center pl-8 mx-auto outline-none"
        type="time"
      />
    </div>
  );
};
export default UniversalDatePicker;
