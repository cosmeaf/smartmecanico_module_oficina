import React, { useState, useEffect } from "react";
import Select from "react-select";
import { BsPersonAdd, BsSkipBackwardFill } from "react-icons/bs";
import { AiFillSave } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SmartButton from "../../components/buttons/SmartButton";
import api from "../../services/api";
import AppointmentCalendar from "../../components/calendar/Calendar";

const Appointment = () => {
  const navigate = useNavigate();

  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [addressOptions, setAddressOptions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.getUser();
      const options = response.data.map((user) => ({
        value: user.id,
        label: user.email,
      }));
      setUserOptions(options);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (selectedUser?.value) {
        const response = await api.getUserByIdAllData(selectedUser?.value);
        const options = response.data.vehicles.map((vehicle) => ({
          value: vehicle.id,
          label: vehicle.plate,
        }));
        setVehicleOptions(options);
        setSelectedVehicle(null);
        setSelectedAddress(null);
      }
      setSelectedVehicle(null);
      setSelectedAddress(null);
    };
    fetchVehicle();
  }, [selectedUser]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (selectedUser?.value) {
        const response = await api.getUserByIdAllData(selectedUser?.value);
        const options = response.data.address.map((item) => ({
          value: item.id,
          label: item.cep,
        }));
        setAddressOptions(options);
        setSelectedAddress(null);
      }
    };
    fetchAddress();
  }, [selectedUser, selectedVehicle]);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">Lista de Clientes</h1>
        <div className="flex gap-2">
          <SmartButton
            variant="btnInfo"
            icon={BsSkipBackwardFill}
            title="Voltar"
            onClick={() => navigate("/dashboard")}
          />
          <SmartButton
            variant="btnSecondary"
            icon={BsPersonAdd}
            title="Novo"
            onClick={() => navigate("/dashboard/user-register")}
          />
        </div>
      </div>
      <div className="shadow-lg sm:rounded-lg bg-white p-8 flex gap-x-4">
        {/* COLUNA ESQUERDA */}
        <div className="w-1/2 pl-4 border bg-gray-50 p-4 rounded-md">
          <form>
            <Select
              placeholder="Selecione Cliente..."
              value={selectedUser}
              onChange={setSelectedUser}
              options={userOptions}
              isSearchable={true}
              className={"mb-4"}
            />

            {vehicleOptions.length > 0 && (
              <Select
                placeholder="Selecione Placa do Veículo..."
                value={selectedVehicle}
                onChange={setSelectedVehicle}
                options={vehicleOptions}
                isSearchable={true}
                className={"mb-4"}
              />
            )}

            {addressOptions.length > 0 && (
              <Select
                placeholder="Selecione Cep"
                value={selectedAddress}
                onChange={setSelectedAddress}
                options={addressOptions}
                isSearchable={true}
                className={"mb-4"}
              />
            )}
            {/* RENDERIZAR CALENDARIO AGENDAMENTO */}
            <AppointmentCalendar />
            <SmartButton
              variant="btnSecondary"
              title="Salvar"
              icon={AiFillSave}
              onClick={() => {}}
            />
          </form>
        </div>
        {/* COLUNA DIREITA */}
        <div className="w-1/2 pr-4 border bg-gray-50 p-4 rounded-md">
          {/* Conteúdo da coluna direita */}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
