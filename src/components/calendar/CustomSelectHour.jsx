import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

const CustomSelectHour = ({ selectedDate, onHourSelect }) => {
  const [appointments, setAppointments] = useState([]);
  const [hourService, setHourService] = useState([]);
  const [hoursAvailable, setHoursAvailable] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);

  useEffect(() => {
    fetchData();
    setSelectedHour(null);
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      const [hourServiceResponse, appointmentsResponse] = await Promise.all([
        api.hourServcieGet(),
        api.appointmentGet(),
      ]);

      const allHours = hourServiceResponse.data.map((item) => item.hour).sort();

      setHourService(allHours);

      const formattedDate = formatDateToBrazilian(selectedDate);
      const filteredAppointments = appointmentsResponse.data.filter(
        (item) => item.day === formattedDate
      );

      setAppointments(filteredAppointments);

      const bookedHours = filteredAppointments.map((app) => app.hour);
      setHoursAvailable((prevAvailableHours) => {
        return allHours.filter((hour) => !bookedHours.includes(hour));
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const formatDateToBrazilian = (isoDate) => {
    if (!isoDate) return;
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleTimeClick = (e, hour) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedHour(hour);
    onHourSelect(hour);
  };

  return (
    <div className="mb-4 mt-4 ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:grid-cols-6">
        {hoursAvailable.map((hour, index) => (
          <button
            key={index}
            className={`p-2 text-center rounded-md 
          ${
            hour === selectedHour
              ? "bg-red-500 text-white"
              : "bg-gray-500 text-white hover:bg-gray-400 hover:text-black"
          } cursor-pointer`}
            onClick={(e) => handleTimeClick(e, hour)}
          >
            {hour}
          </button>
        ))}
      </div>
    </div>
  );
};

CustomSelectHour.propTypes = {
  selectedDate: PropTypes.string,
  onHourSelect: PropTypes.func.isRequired,
};

export default CustomSelectHour;
