import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { AiFillSave } from "react-icons/ai";
import SmartForm from "../../components/forms/SmartForm";
import CustomCalendar from "../../components/calendar/CustomCalendar";
import SmartButton from "../../components/buttons/SmartButton";
import CustomSelectHour from "../../components/calendar/CustomSelectHour";
import { showMessage } from "../../components/Notification";
import api from "../../services/api";
import { BsPersonAdd, BsSkipBackwardFill } from "react-icons/bs";

const Appointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Select Service Data
  const [services, setServices] = useState([]);
  const [selectService, setSelectService] = useState(null);
  // Select User Data
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  // Select Address Data
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  // Select Vehicle Data
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState(null);
  const [appointmentData, setAppointmentData] = useState([]);

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
    setUsers(null);
    setAddresses(null);
    setVehicles(null);
    setSelectedUser(null);
    setSelectedAddress(null);
    setSelectedVehicle(null);
    setFormattedDate(null);
    setSelectedHour(null);
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

  useEffect(() => {
    const getAppointmet = async () => {
      try {
        const response = await api.appointmentGet();
        if (response.status) {
          setAppointmentData(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar Agendamentos:", error);
      }
    };
    getAppointmet();
  }, []);

  const formatDate = () => {
    setFormattedDate(date.toISOString().slice(0, 10));
  };

  const handleUserChange = (userOption) => {
    setSelectedUser(userOption);
    setSelectedAddress(null);
    setSelectedVehicle(null);
    // setDate(null);
    // setFormattedDate(null);
    setSelectedHour(null);
  };

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
      !formattedDate ||
      !selectedHour
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
        selectedHour,
        formattedDate
      );
      if (response.status) {
        navigate("/dashboard/appointment", {
          replace: true,
          state: { from: location },
        });
        showMessage({
          status: "success",
          message: "Serviço Agendado Sucesso",
        });
        handleUserChange();
      } else {
        showMessage({
          status: "error",
          message: "Ops! Error ao Realizar Agendamento",
        });
      }
    } catch (error) {
      showMessage({ status: "error", message: error.message });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">Agendar Serviço</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border rounded-md shadow-lg p-8">
        <div className="p-4 shadow-md rounded-md border">
          <SmartForm onSubmit={handleSubmit}>
            <Select
              placeholder="Selecione Serviço..."
              value={selectService}
              onChange={(serviceOption) => setSelectService(serviceOption)}
              options={services}
              isSearchable={true}
              className={"mb-4"}
            />

            {selectService && (
              <Select
                placeholder="Selecione Cliente..."
                value={selectedUser}
                onChange={(userOption) => {
                  handleUserChange(userOption);
                }}
                options={users}
                isSearchable={true}
                className={"mb-4"}
              />
            )}

            {selectedUser && (
              <Select
                placeholder="Selecione CEP do Endereço"
                value={selectedAddress}
                onChange={(addressOption) => setSelectedAddress(addressOption)}
                options={addresses}
                isSearchable={true}
                className={"mb-4"}
              />
            )}

            {selectedAddress && (
              <Select
                placeholder="Selecione Placa do Veículo..."
                value={selectedVehicle}
                onChange={(vehicleOption) => setSelectedVehicle(vehicleOption)}
                options={vehicles}
                isSearchable={true}
                className={"mb-4"}
              />
            )}
            {selectedVehicle && (
              <CustomCalendar
                value={date}
                onChange={(newDate) => setDate(newDate)}
                beforeDate={true}
                dayBlocks={["sunday"]}
                onClickDay={formatDate}
              />
            )}
            {formattedDate && (
              <CustomSelectHour
                selectedDate={formattedDate}
                onHourSelect={setSelectedHour}
              />
            )}

            <div className="mt-5">
              <SmartButton
                type="submit"
                className={`flex justify-center items-center btnPrimary rounded-md px-4`}
                title="Confirmar Agendamento"
                icon={AiFillSave}
                width="100%"
                height="40px"
              />
            </div>
          </SmartForm>
        </div>
        <div className="flex flex-col h-screen">
          <div className="p-4 shadow-md rounded-md border flex-shrink-0">
            <h1>Lista de Agendamentos</h1>
          </div>
          <div className="flex-grow overflow-y-auto">
            {appointmentData.map((appointment, index) => (
              <div
                key={index}
                className="my-2 p-3 border rounded shadow-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => {}}
              >
                <p className="flex justify-between text-md px-4">
                  <div>
                    <strong className="mr-1">Serviço:</strong>
                    {appointment.service}
                  </div>
                  <div>
                    <strong>Data:</strong> {appointment.day}
                  </div>
                  <div>
                    <strong className="mr-1">Hora:</strong> {appointment.hour}
                  </div>
                </p>

                <p className="text-md px-4">
                  <strong>Protocolo:</strong> {appointment.protocol}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
