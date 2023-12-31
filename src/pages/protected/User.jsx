// src/pages/protected/VehicleAdd.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import { BsPersonAdd, BsSkipBackwardFill } from "react-icons/bs";
import { DataColumn, DataColumns, DataTable } from "../../components/dataTable";
import SmartButton from "../../components/buttons/SmartButton";
import api from "../../services/api";

function User() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await api.getUser();
      if (response && response.status) {
        response.data && setUsers(response.data);
      }
    }

    fetchData();
  }, []);

  const commands = [
    {
      label: "Visualizer",
      icon: <FaEye size={15} />,
      type: "Visualizer",
      onClick: (id) => {
        navigate(`/dashboard/user-all/${id}`);
      },
    },
    {
      label: "Edit",
      icon: <FaEdit size={15} />,
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
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white p-8">
        <DataTable
          dataSource={users}
          dataCount={true}
          dataSearch={true}
          pagination={true}
        >
          <DataColumns>
            <DataColumn field="email" title="E-mail" />
            <DataColumn field="first_name" title="Nome" />
            <DataColumn field="last_name" title="Sobrenome" />
            <DataColumn field="phone_number" title="Telefone" />
            <DataColumn field="Nascimento" title="Aniversario" />
            <DataColumn title="Ações" field="action" commands={commands} />
          </DataColumns>
        </DataTable>
      </div>
    </div>
  );
}

export default User;
