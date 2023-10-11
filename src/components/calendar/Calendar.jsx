import React, { useEffect, useState } from "react";
import { showMessage } from "../../components/Notification";
import appointmentData from "../../data/appointmantData";
import hourServiceData from "../../data/hourServiceData";

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const Calendar = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [startOfWeek, setStartOfWeek] = useState(
    currentDate.getDate() - currentDate.getDay()
  );
  const [listDays, setListDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    generateDaysForWeek(selectedYear, selectedMonth, startOfWeek);
  }, [selectedYear, selectedMonth, startOfWeek]);

  const generateDaysForWeek = (year, month, startDay) => {
    const newListDays = [];
    for (let i = 0; i < 7; i++) {
      let d = new Date(year, month, startDay + i);
      newListDays.push({
        weekday: weekDays[d.getDay()],
        number: d.getDate(),
        date: d,
      });
    }
    setListDays(newListDays);
  };

  const getAvailableHoursForDate = (selectedDate) => {
    const appointmentsForDate = appointmentData.filter(
      (app) => app.data === selectedDate
    );
    const bookedHours = appointmentsForDate.map((app) => app.hour);

    const now = new Date();
    const isToday =
      selectedDay &&
      now.toDateString() ===
        new Date(
          selectedYear,
          selectedMonth,
          selectedDay.number
        ).toDateString();

    let currentHour = now.getHours();

    return hourServiceData.filter((h) => {
      if (isToday && parseInt(h.hour.split(":")[0]) <= currentHour)
        return false;
      return !bookedHours.includes(h.hour);
    });
  };

  const isPastDate = (year, month, day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkedDate = new Date(year, month, day);

    return checkedDate.getTime() < today.getTime();
  };

  const handleDayClick = (day) => {
    handleCancel();
    const today = new Date();
    const currentHour = today.getHours();
    const selectedDate = new Date(selectedYear, selectedMonth, day.number);
    const isTodayButBeforeLimitHour =
      selectedDate.toDateString() === today.toDateString() && currentHour < 12;

    if (
      (selectedDate > today || isTodayButBeforeLimitHour) &&
      !blockWeekendAndHolidays(day)
    ) {
      setSelectedDay(day);
      const formattedDate = `${selectedYear}-${String(
        selectedMonth + 1
      ).padStart(2, "0")}-${String(day.number).padStart(2, "0")}`;
      const hours = getAvailableHoursForDate(formattedDate);
      setAvailableHours(hours);
    }
  };

  const handleHourClick = (hour) => {
    setShowConfirmation(true);
    const formattedDate = `${selectedYear}-${String(selectedMonth + 1).padStart(
      2,
      "0"
    )}-${String(selectedDay.number).padStart(2, "0")}`;
    const appointment = appointmentData.find(
      (app) => app.data === formattedDate && app.hour === hour.hour
    );
    setSelectedAppointment(
      appointment || { hour: hour.hour, data: formattedDate }
    );
  };

  const blockWeekendAndHolidays = (day) => {
    const date = new Date(selectedYear, selectedMonth, day.number);
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const handleConfirmation = (status) => {
    if (status === "success") {
      showMessage({ status: "success", message: "Agendamento bem-sucedido!" });
      // Aqui, você pode redirecionar para a rota desejada
      // history.push('/appointment-list');
    } else {
      showMessage({
        status: "error",
        message: "Houve um erro ao fazer o agendamento.",
      });
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setSelectedAppointment(null);
  };

  const handleConfirm = () => {
    handleConfirmation("success");

    setSelectedDay(null);
    setSelectedAppointment(null);
    setShowConfirmation(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <div className="md:flex md:space-x-4">
        <div className="md:w-1/2 border shadow-xl rounded-lg p-2">
          <div className="flex justify-between mb-5 mt-2">
            <button
              onClick={() => setStartOfWeek((prev) => prev - 7)}
              className="text-blue-500 hover:text-blue-700 ml-4"
            >
              Anterior
            </button>
            <span className="font-semibold">
              {monthNames[selectedMonth]} {selectedYear}
            </span>
            <button
              onClick={() => setStartOfWeek((prev) => prev + 7)}
              className="text-blue-500 hover:text-blue-700 mr-4"
            >
              Próximo
            </button>
          </div>
          <hr className="my-4" />
          <div className="grid grid-cols-7 gap-2 mb-4">
            {listDays.map((day) => {
              const pastDate = isPastDate(
                selectedYear,
                selectedMonth,
                day.number
              );

              return (
                <button
                  key={day.number}
                  onClick={() => !pastDate && handleDayClick(day)}
                  className={`py-1 border rounded hover:bg-gray-200 ${
                    pastDate ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <div className="text-xs">{day.weekday}</div>
                  <div className="font-semibold">{day.number}</div>
                </button>
              );
            })}
          </div>
          <hr className="my-4" />
          <div className="grid grid-cols-6 gap-4 mb-4">
            {availableHours.map((hour) => (
              <button
                key={hour.hour}
                onClick={() => handleHourClick(hour)}
                className="p-1 border rounded hover:bg-gray-200 shadow-2xl"
              >
                {hour.hour}
              </button>
            ))}
          </div>

          {selectedAppointment && (
            <div className="p-4 border rounded bg-gray-100 mt-4">
              <h3 className="font-bold mb-2">Detalhes do agendamento</h3>
              <p>
                <strong>Nome:</strong> {selectedAppointment.first_name}
              </p>
              <p>
                <strong>Endereço:</strong> {selectedAppointment.address}
              </p>
              <p>
                <strong>Veículo:</strong> {selectedAppointment.vehicle}
              </p>
              <p>
                <strong>Data do agendamento:</strong> {selectedAppointment.data}
              </p>
              <p>
                <strong>Hora do agendamento:</strong> {selectedAppointment.hour}
              </p>
              <div className="mt-4">
                <button
                  onClick={handleConfirm}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                >
                  Confirmar
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="md:w-1/2 shadow-xl rounded-lg">
          {/* Conteúdo da segunda coluna aqui */}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
