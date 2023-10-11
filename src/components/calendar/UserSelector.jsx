import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

const UserSelector = ({ onUserChange }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { status, data } = await api.getUser();
      if (status) {
        setUsers(data);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const userId = e.target.value;
    const user = users.find((u) => u.id.toString() === userId);
    setSelectedUser(user);
    onUserChange(user);
  };

  return (
    <select value={selectedUser?.id || ""} onChange={handleChange}>
      <option value="" disabled>
        Selecione um usuário
      </option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

UserSelector.propTypes = {
  onUserChange: PropTypes.func.isRequired,
};

export default UserSelector;
