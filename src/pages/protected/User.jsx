// src/pages/protected/VehicleAdd.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { BsPersonAdd, BsSkipBackwardFill } from "react-icons/bs";
import { DataColumn, DataColumns, DataTable } from "../../components/dataTable";
import SmartButton from "../../components/buttons/SmartButton";
import api from "../../services/api";

function User() {
  const [vehicle, setVehicle] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await api.getUser();
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
        navigate(`/dashboard/user/${id}`);
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">Lista de Clientes</h1>
        <div className="flex gap-2">
          <SmartButton
            variant="btnPrimary"
            icon={BsSkipBackwardFill}
            title="Dashboard"
            onClick={() => navigate("/dashboard")}
          />
          <SmartButton
            variant="btnInfo"
            icon={BsPersonAdd}
            title="Novo"
            onClick={() => navigate("/dashboard/user-register")}
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
            <DataColumn field="first_name" title="Nome" />
            <DataColumn field="last_name" title="Sobrenome" />
            <DataColumn field="email" title="E-mail" />
            <DataColumn field="year" title="Ano" />
            <DataColumn field="phone_number" title="Contato" />
            <DataColumn title="Ações" field="action" commands={commands} />
          </DataColumns>
        </DataTable>
      </div>
    </div>
  );
}

export default User;
