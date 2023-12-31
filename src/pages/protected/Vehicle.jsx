// src/pages/protected/VehicleAdd.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { BsCarFront, BsPersonAdd, BsSkipBackwardFill } from "react-icons/bs";
import { DataColumn, DataColumns, DataTable } from "../../components/dataTable";
import SmartButton from "../../components/buttons/SmartButton";
import api from "../../services/api";

function Vehicle() {
  const [vehicle, setVehicle] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await api.vehicleGet();
      if (response && response.status) {
        response.data && setVehicle(response.data);
      }
    }

    fetchData();
  }, []);

  const commands = [
    {
      label: "Visualizer",
      icon: <FaEye size={20} />,
      type: "Visualizer",
      onClick: (id) => {
        console.log(`Visualizar ${id}`);
      },
    },
    {
      label: "Edit",
      icon: <FaEdit size={20} />,
      type: "Edit",
      onClick: (id) => {
        console.log(`Edit ${id}`);
      },
    },
    {
      label: "Delete",
      icon: <FaTrashAlt size={20} />,
      type: "Delete",
      onClick: (id) => {
        console.log(`Delete ${id}`);
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">Lista de Veículos</h1>
        <div className="flex gap-2">
          <SmartButton
            variant="btnPrimary"
            icon={BsSkipBackwardFill}
            title="Dashboard"
            onClick={() => navigate("/dashboard")}
          />
          <SmartButton
            variant="btnInfo"
            icon={BsCarFront}
            title="Novo"
            onClick={() => navigate("/dashboard/vehicle-register")}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-8">
        <DataTable
          dataSource={vehicle}
          dataCount={true}
          dataSearch={true}
          pagination={true}
        >
          <DataColumns>
            <DataColumn field="brand" title="Marca" />
            <DataColumn field="model" title="Modelo" />
            <DataColumn field="fuel" title="Combustível" />
            <DataColumn field="year" title="Ano" />
            <DataColumn field="plate" title="Placa" />
            <DataColumn field="user" title="Proprietário" />
            <DataColumn title="Ações" field="action" commands={commands} />
          </DataColumns>
        </DataTable>
      </div>
    </div>
  );
}

export default Vehicle;
