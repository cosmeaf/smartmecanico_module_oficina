import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BsSkipBackwardFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import SmartButton from "../../components/buttons/SmartButton";
import api from "../../services/api";

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await api.servieGet();
        setServices(response.data);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
      }
    };
    getServices();
  }, []);

  const handleClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="content p-4 md:p-4 lg:w-full max-w-1200 mx-auto min-h-screen">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">Escolha um Serviço</h1>
        <div className="flex gap-2">
          <SmartButton
            variant="btnPrimary"
            icon={BsSkipBackwardFill}
            title="Voltar"
            onClick={() => navigate("/dashboard")}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-1 gap-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={handleClick}
                isSelected={selectedService === service}
              />
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 p-4 overflow-y-auto max-h-[80vh]">
          {selectedService ? (
            <ServiceDetails service={selectedService} onAgendar={() => {}} />
          ) : (
            <div className="text-gray-500">
              Selecione um serviço para ver os detalhes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service, onClick, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`p-3 rounded-md cursor-pointer shadow-md ${
        isHovered ? "bg-gray-100" : ""
      } ${isSelected ? "border border-green-500" : ""}`}
      onClick={() => onClick(service)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1">{service.name}</h2>
          <p className="text-gray-500">{service.description}</p>
        </div>
        <img
          src={service.image}
          className="w-12 h-12 rounded-md object-cover ml-4"
          alt={service.name}
        />
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

const ServiceDetails = ({ service, onAgendar }) => {
  return (
    <div className="p-4 rounded-md shadow-md bg-white max-h-[80vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">{service.name}</h2>
      <p className="text-gray-600 mb-6">{service.description}</p>
      <button
        onClick={onAgendar}
        className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
      >
        Agendar Serviço
      </button>
    </div>
  );
};

ServiceDetails.propTypes = {
  service: PropTypes.object.isRequired,
  onAgendar: PropTypes.func.isRequired,
};

export default Services;
