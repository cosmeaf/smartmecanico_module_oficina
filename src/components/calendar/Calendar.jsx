import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function AppointmentCalendar() {
  const weekdayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const hours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {}, [selectedDate]);

  const handleDateChange = (date) => {
    if (date.getDay() !== 0) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="mb-5">
      <h2 className="mb-5">Escolha uma data disponível</h2>

      <Calendar
        className="mb-3"
        onChange={handleDateChange}
        value={selectedDate}
        formatShortWeekday={(locale, date) => weekdayNames[date.getDay()]}
        formatMonthYear={(locale, date) => {
          const month = date.toLocaleDateString(locale, { month: "long" });
          const year = date.getFullYear();
          return `« ${month} de ${year} »`;
        }}
        minDate={new Date()}
      />
      <div>
        <h2>Selecione Horário disponível</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 mt-3 w-full">
          {hours.map((hour, index) => (
            <div
              key={index}
              className="bg-gray-200 p-2 text-center rounded-md hover:bg-gray-300 cursor-pointer"
            >
              {hour}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppointmentCalendar;
