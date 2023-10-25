import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../../services/api";

function AppointmentCalendar({ onDateChange, onTimeChange }) {
  const [appointments, setAppointments] = useState([]);
  const [hourService, setHourService] = useState([]);
  const [hoursAvailable, setHoursAvailable] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);

  const weekdayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDateToAppointment = (date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  useEffect(() => {
    getHourServices();
    getAppointment().then(() => {
      updateAvailableHours(selectedDate);
    });
  }, [selectedDate]);

  const getHourServices = async () => {
    const response = await api.hourServcieGet();
    const fetchedHours = response.data.map((item) => item.hour);
    setHourService(fetchedHours);
  };

  const getAppointment = async () => {
    const response = await api.appointmentGet({
      date: formatDateToAppointment(selectedDate),
    });
    setAppointments(response.data);
  };

  const updateAvailableHours = (specificDate) => {
    const filteredAppointments = appointments
      .filter(
        (appointment) =>
          appointment.day === formatDateToAppointment(specificDate)
      )
      .map((appointment) => appointment.hour);

    const availableHours = hourService.filter(
      (hour) => !filteredAppointments.includes(hour)
    );

    setHoursAvailable(availableHours);
  };

  const handleDateChange = (date) => {
    if (date.getDay() !== 0) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split("T")[0];
      onDateChange(formattedDate);
    }
  };

  const handleTimeClick = (hour) => {
    setSelectedHour(hour);
    onTimeChange(hour);
  };

  return (
    <div className="mb-5">
      <h2 className="mb-5">Escolha uma data disponível</h2>
      <Calendar
        className="mb-3 w-full rounded-md shadow-lg"
        onChange={handleDateChange}
        value={selectedDate}
        formatShortWeekday={(_, date) => weekdayNames[date.getDay()]}
        formatMonthYear={(locale, date) => {
          const month = date.toLocaleDateString(locale, { month: "short" });
          const year = date.getFullYear();
          return `« ${month} de ${year} »`;
        }}
        minDate={new Date()}
      />
      <div>
        <h2>Selecione Horário disponível</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 mt-3 w-full">
          {hoursAvailable
            .sort((a, b) => {
              const [hourA, minuteA] = a.split(":").map(Number);
              const [hourB, minuteB] = b.split(":").map(Number);
              return hourA - hourB || minuteA - minuteB;
            })
            .map((hour, index) => (
              <button
                key={index}
                className={`p-2 text-center rounded-md 
        ${
          hour === selectedHour
            ? "bg-red-500 text-white"
            : "bg-gray-500 text-white hover:bg-gray-400 hover:text-black"
        } 
        cursor-pointer`}
                onClick={() => handleTimeClick(hour)}
              >
                {hour}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

AppointmentCalendar.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
};

export default AppointmentCalendar;
