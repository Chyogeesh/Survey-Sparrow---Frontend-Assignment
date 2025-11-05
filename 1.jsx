import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths, isSameMonth, isSameDay, parse } from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1)); // Starting from November 2025 as per current date
  const today = new Date(2025, 10, 5); // November 5, 2025, as per the provided current date

  // Static events data based on the example, with added dates for demonstration (since example lacked dates).
  // In a real app, this could be imported from a JSON file like import events from './events.json';
  const events = [
    {
      date: new Date(2025, 10, 5),
      startTime: "00:00",
      endTime: "01:30",
      color: "#f6be23",
      title: "Daily Standup",
    },
    {
      date: new Date(2025, 10, 5),
      startTime: "04:30",
      endTime: "07:30",
      color: "#f6501e",
      title: "Weekly catchup",
    },
    // Additional events for testing overlaps and multiple days
    {
      date: new Date(2025, 10, 6),
      startTime: "05:00",
      endTime: "06:00",
      color: "#00ff00",
      title: "Morning Meeting",
    },
    {
      date: new Date(2025, 10, 6),
      startTime: "05:30",
      endTime: "07:00",
      color: "#0000ff",
      title: "Overlapping Meeting",
    },
    {
      date: new Date(2025, 10, 10),
      startTime: "09:00",
      endTime: "10:00",
      color: "#ff0000",
      title: "Team Sync",
    },
  ];

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Prev
        </button>
        <h2 className="text-2xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Next
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = parse('2025-11-01', 'yyyy-MM-dd', new Date());
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center font-bold text-gray-600" key={i}>
          {format(addDays(startDate, i), 'eee')}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-2 mb-2">{days}</div>;
  };

  const parseTime = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const getEventsForDay = (day) => {
    return events.filter((event) => isSameDay(event.date, day));
  };

  const hasConflict = (dayEvents) => {
    if (dayEvents.length < 2) return false;
    const sorted = [...dayEvents].sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime));
    for (let i = 0; i < sorted.length - 1; i++) {
      if (parseTime(sorted[i + 1].startTime) < parseTime(sorted[i].endTime)) {
        return true;
      }
    }
    return false;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const cloneDay = day;
        const dayEvents = getEventsForDay(cloneDay);
        const isConflict = hasConflict(dayEvents);

        days.push(
          <div
            className={`p-2 border rounded h-32 overflow-y-auto text-sm ${
              !isSameMonth(day, monthStart)
                ? 'bg-gray-100 text-gray-400'
                : isSameDay(day, today)
                ? 'bg-blue-100 font-bold'
                : 'bg-white'
            }`}
            key={day.toString()}
          >
            <span className="block text-right">{formattedDate}</span>
            {isConflict && <span className="text-red-500 text-xs font-bold block">Conflict!</span>}
            {dayEvents.map((event, idx) => (
              <div
                key={idx}
                className="text-xs p-1 mb-1 rounded text-white"
                style={{ backgroundColor: event.color }}
              >
                {event.title} ({event.startTime} - {event.endTime})
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2 mb-2" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
