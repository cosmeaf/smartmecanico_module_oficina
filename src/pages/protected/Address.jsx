// src/pages/protected/VehicleAdd.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import { BsBuildingAdd, BsSkipBackwardFill } from "react-icons/bs";
import { DataColumn, DataColumns, DataTable } from "../../components/dataTable";
import SmartButton from "../../components/buttons/SmartButton";
import api from "../../services/api";

function Address() {
  const [address, setAddress] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await api.getAddress();
      if (response && response.status) {
        response.data && setAddress(response.data);
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
        navigate(`/dashboard/address/${id}`);
      },
    },
    {
      label: "Edit",
      icon: <FaEdit size={15} />,
      type: "Edit",
      onClick: (id) => {
        navigate(`/dashboard/address-update/${id}`);
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">Lista de Endereços</h1>
        <div className="flex gap-2">
          <SmartButton
            variant="btnPrimary"
            icon={BsSkipBackwardFill}
            title="Voltar"
            onClick={() => navigate("/dashboard")}
          />
          <SmartButton
            variant="btnAlert"
            icon={BsBuildingAdd}
            title="Novo"
            onClick={() => navigate("/dashboard/address-register")}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white p-8">
        <DataTable
          dataSource={address}
          dataCount={true}
          dataSearch={true}
          pagination={true}
        >
          <DataColumns>
            <DataColumn field="cep" title="Cep" />
            <DataColumn field="logradouro" title="Rua/Avenida" />
            <DataColumn field="bairro" title="Bairro" />
            <DataColumn field="complemento" title="Complemento" />
            <DataColumn field="localidade" title="Cidade" />
            <DataColumn field="uf" title="Estado" />
            <DataColumn title="Ações" field="action" commands={commands} />
          </DataColumns>
        </DataTable>
      </div>
    </div>
  );
}

export default Address;
