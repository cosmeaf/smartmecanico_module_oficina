import React from "react";
import Calendar from "react-calendar";
import PropTypes from "prop-types";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";

const CustomCalendar = ({
  beforeDate = false,
  weekendBlock = false,
  dayBlocks = [],
  onClickDay,
  ...props
}) => {
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  // Bloqueia datas baseado nas propriedades
  const tileDisabled = ({ date }) => {
    if (beforeDate && date < new Date()) return true;
    if (weekendBlock && (date.getDay() === 6 || date.getDay() === 0))
      return true;
    if (dayBlocks.includes(daysOfWeek[date.getDay()])) return true;
    return false;
  };

  return (
    <Calendar
      className="full-width-calendar"
      {...props}
      tileDisabled={tileDisabled}
      tileClassName={({ date, view }) => {
        if (
          view === "month" &&
          date?.toISOString().slice(0, 10) ===
            props.value?.toISOString().slice(0, 10)
        ) {
          return "react-calendar__tile--hover";
        }
      }}
      onClickDay={(value, event) => {
        if (onClickDay) onClickDay(value, event);
      }}
    />
  );
};

CustomCalendar.propTypes = {
  beforeDate: PropTypes.bool,
  weekendBlock: PropTypes.bool,
  dayBlocks: PropTypes.arrayOf(
    PropTypes.oneOf([
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ])
  ),
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  onClickDay: PropTypes.func,
};

export default CustomCalendar;
