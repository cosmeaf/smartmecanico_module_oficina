import React, { useState, useEffect } from "react";
import Select from "react-select";
import { BsPersonAdd, BsSkipBackwardFill } from "react-icons/bs";
import { AiFillSave } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import SmartButton from "../../components/buttons/SmartButton";
import api from "../../services/api";
import SmartForm from "../../components/forms/SmartForm";
import { showMessage } from "../../components/Notification";
import CustomCalendar from "../../components/calendar/CustomCalendar";

const Appointment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [services, setServices] = useState([]);
  const [selectService, setSelectService] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "blue" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px blue" : null,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "lightgray"
        : provided.backgroundColor,
    }),
  };

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await api.serviceGet();
        const serviceOption = response?.data.map((service) => ({
          value: service.id,
          label: service.name,
        }));
        setServices(serviceOption);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
      }
    };
    getServices();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (selectService?.value) {
        try {
          const response = await api.getUser();
          const userOption = response.data.map((user) => ({
            value: user.id,
            label: user.email,
          }));
          setUsers(userOption);
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        }
      }
    };
    fetchUsers();
  }, [selectService]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (selectedUser?.value) {
        try {
          const response = await api.getUserByIdAllData(selectedUser.value);
          const addressOption = response.data.address.map((address) => ({
            value: address.id,
            label: address.cep,
          }));
          setAddresses(addressOption);
        } catch (error) {
          console.error("Erro ao buscar endereços:", error);
        }
      }
    };
    fetchAddress();
  }, [selectedUser]);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (selectedUser?.value) {
        try {
          const response = await api.getUserByIdAllData(selectedUser.value);
          const vehicleOption = response.data.vehicles.map((vehicle) => ({
            value: vehicle.id,
            label: vehicle.plate,
          }));
          setVehicles(vehicleOption);
        } catch (error) {
          console.error("Erro ao buscar veículos:", error);
        }
      }
    };
    fetchVehicle();
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = selectedUser ? selectedUser.value : null;
    const vehicle = selectedVehicle ? selectedVehicle.value : null;
    const addressVal = selectedAddress ? selectedAddress.value : null;
    const service = selectService ? selectService.value : null;

    if (
      !user ||
      !vehicle ||
      !addressVal ||
      !service ||
      !selectedDate ||
      !selectedTime
    ) {
      showMessage({
        status: "warning",
        message: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    try {
      const response = await api.appointmentPost(
        user,
        addressVal,
        service,
        vehicle,
        selectedTime,
        selectedDate
      );
      console.log(response);
      if (response && response.status === 200) {
        navigate("/dashboard/appointment", {
          replace: true,
          state: { from: location },
        });
        showMessage({
          status: "success",
          message: "Serviço Agendado Sucesso",
        });
      } else {
        showMessage({
          status: "error",
          message: `${response.data}`,
        });
      }
    } catch (error) {
      showMessage({ status: "error", message: error.message });
    }
  };

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
      <div className="shadow-lg sm:rounded-lg bg-white p-8">
        {/* COLUNA ESQUERDA */}
        <div className="pl-4 border bg-gray-50 p-4 rounded-md">
          <SmartForm onSubmit={handleSubmit}>
            <Select
              placeholder="Selecione Serviço..."
              value={selectService}
              onChange={(serviceOption) => setSelectService(serviceOption)}
              options={services}
              isSearchable={true}
              className={"mb-4"}
              styles={customStyles}
            />
            <Select
              placeholder="Selecione Cliente..."
              value={selectedUser}
              onChange={(userOption) => setSelectedUser(userOption)}
              options={users}
              isSearchable={true}
              className={"mb-4"}
              styles={customStyles}
            />

            {vehicles.length > 0 && (
              <Select
                placeholder="Selecione Placa do Veículo..."
                value={selectedVehicle}
                onChange={(vehicleOption) => setSelectedVehicle(vehicleOption)}
                options={vehicles}
                isSearchable={true}
                className={"mb-4"}
                styles={customStyles}
              />
            )}

            {addresses.length > 0 && (
              <Select
                placeholder="Selecione CEP do Endereço"
                value={selectedAddress}
                onChange={(addressOption) => setSelectedAddress(addressOption)}
                options={addresses}
                isSearchable={true}
                className={"mb-4"}
                styles={customStyles}
              />
            )}
            {/* RENDERIZAR CALENDARIO AGENDAMENTO */}

            <SmartButton
              type="submit"
              variant="btnPrimary"
              title="Agendar Serviço"
              icon={AiFillSave}
              width="180px"
              height="40px"
            />
          </SmartForm>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
