import React from "react";

const CalendarHeader = ({ currentMonth, onPrev, onNext }) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrev}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ←
      </button>
      <h2 className="text-xl font-semibold text-gray-800">
        {currentMonth.format("MMMM YYYY")}
      </h2>
      <button
        onClick={onNext}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        →
      </button>
    </div>
  );
};

export default CalendarHeader;
