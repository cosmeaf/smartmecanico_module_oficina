import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { BsPersonAdd, BsSave2Fill, BsSkipBackwardFill } from "react-icons/bs";
import SmartButton from "../../components/buttons/SmartButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SmartForm, SmartInput } from "../../components/forms";
import { showMessage } from "../../components/Notification";
import api from "../../services/api";
import { async } from "q";

const AddressUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({});
  const userRef = useRef();

  const [addressData, setAddressData] = useState([]);

  useEffect(() => {
    const fetchAddressById = async () => {
      const response = await api.getAddressById(id);
      if (response.status) {
        setAddressData(response.data);
      } else {
        showMessage({
          status: "error",
          message: "Ocorreu um erro ao carregar os dados do usuário.",
        });
      }
    };
    fetchAddressById();
  }, []);

  useEffect(() => {
    if (cep.length === 8) {
      const searchAddress = async () => {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setAddress(data);
      };

      searchAddress();
    }
  }, [cep]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const id = form.id.value;
    const cep = form.cep.value;
    const logradouro = form.logradouro.value;
    const complemento = form.complemento.value;
    const bairro = form.bairro.value;
    const localidade = form.localidade.value;
    const uf = form.uf.value;
    try {
      const response = await api.addressPatch(
        id,
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        uf
      );
      if (response.status) {
        navigate("/dashboard/address", {
          replace: true,
          state: { from: location },
        });
        showMessage({
          status: "success",
          message: "Atualizado com Sucesso",
        });
      } else {
        showMessage({
          status: "error",
          message: "Ops! Error ao Atualizar",
        });
      }
    } catch (error) {
      showMessage({ status: "error", message: error.message });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">Atualizar Endereço</h1>
        <div className="flex gap-2">
          <SmartButton
            variant="btnPrimary"
            icon={BsSkipBackwardFill}
            title="Endereços"
            onClick={() => navigate("/dashboard/address")}
          />
        </div>
      </div>
      {/* Content Area */}
      <div className="flex flex-col shadow-lg py-10 px-4 sm:rounded-lg bg-white">
        <SmartForm onSubmit={handleSubmit}>
          <SmartInput name="id" value={addressData.id || ""} type="hidden" />

          <SmartInput
            label="Cliente"
            name="user"
            value={addressData.user}
            readonly={true}
          />
          <SmartInput label="CEP" name="cep" value={addressData.cep} />

          <SmartInput
            label="Endereço"
            name="logradouro"
            value={addressData.logradouro}
            disabled
          />
          <SmartInput
            label="Bairro"
            name="bairro"
            value={addressData.bairro}
            disabled
          />

          <SmartInput
            label="Complemento"
            name="complemento"
            value={addressData.complemento}
          />
          <SmartInput
            label="Cidade"
            name="localidade"
            value={addressData.localidade}
            disabled
          />
          <SmartInput
            label="Estado"
            name="uf"
            value={addressData.uf}
            disabled
          />

          <SmartButton
            type="submit"
            variant="btnPrimary"
            icon={BsSave2Fill}
            title="Atualizar"
          />
        </SmartForm>
      </div>
    </div>
  );
};

export default AddressUpdate;
