import React, { useState } from "react";
import Calendar from "../../components/calendar/Calendar";
import UserSelector from "../../components/UserSelector";

const Appointment = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <UserSelector onUserChange={setSelectedUser} />
      {selectedUser && <Calendar user={selectedUser} />}
    </div>
  );
};

export default Appointment;
