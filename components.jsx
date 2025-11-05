import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import CalendarHeader from "./CalendarHeader";
import DayCell from "./DayCell";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error loading events:", err));
  }, []);

  const daysInMonth = currentMonth.daysInMonth();
  const firstDay = currentMonth.startOf("month").day();

  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  const today = dayjs();

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="bg-transparent"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = currentMonth.date(day).format("YYYY-MM-DD");
    const dayEvents = events.filter((event) => event.date === date);
    cells.push(
      <DayCell
        key={day}
        day={day}
        isToday={today.isSame(currentMonth.date(day), "day")}
        events={dayEvents}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={prevMonth}
        onNext={nextMonth}
      />
      <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mt-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">{cells}</div>
    </div>
  );
};

export default Calendar;
