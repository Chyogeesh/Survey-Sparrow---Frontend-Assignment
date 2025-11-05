import React from "react";

const DayCell = ({ day, isToday, events }) => {
  return (
    <div
      className={`border rounded-lg h-28 p-2 text-left relative ${
        isToday ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
    >
      <span
        className={`absolute top-1 right-2 text-sm font-semibold ${
          isToday ? "text-blue-600" : "text-gray-700"
        }`}
      >
        {day}
      </span>
      <div className="mt-5 space-y-1">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="text-xs rounded-md px-1 py-0.5 text-white truncate"
            style={{ backgroundColor: event.color }}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayCell;
