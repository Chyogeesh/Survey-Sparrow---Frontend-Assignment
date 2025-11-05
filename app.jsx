import React from "react";
import Calendar from "./components/Calendar";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📅 Company Calendar
      </h1>
      <Calendar />
    </div>
  );
};

export default App;
