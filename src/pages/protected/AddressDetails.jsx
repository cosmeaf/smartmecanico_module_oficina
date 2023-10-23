import React from "react";
import { BsPersonAdd, BsSkipBackwardFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import SmartButton from "../../components/buttons/SmartButton";

const AddressDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">Lista de Endereços</h1>
        <div className="flex gap-2">
          <SmartButton
            variant="btnInfo"
            icon={BsSkipBackwardFill}
            title="Voltar"
            onClick={() => navigate("/dashboard/address")}
          />
          <SmartButton
            variant="btnSecondary"
            icon={BsPersonAdd}
            title="Novo"
            onClick={() => navigate("/dashboard/address-register")}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
