import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { BsPersonAdd, BsSave2Fill, BsSkipBackwardFill } from "react-icons/bs";
import SmartButton from "../../components/buttons/SmartButton";
import { useLocation, useNavigate } from "react-router-dom";
import { SmartForm, SmartInput } from "../../components/forms";
import { showMessage } from "../../components/Notification";
import api from "../../services/api";

const AddressAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userOptions, setUserOptions] = useState([]);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const userRef = useRef();

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
  }, [userOptions]);

  useEffect(() => {
    if (cep.length === 8) {
      const searchAddress = async () => {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setAddress(data);
      };

      searchAddress();
    }
  }, [cep, userOptions]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const user = selectedUser && selectedUser.label ? selectedUser.label : null;
    const cep = form.cep.value;
    const logradouro = form.logradouro.value;
    const complemento = form.complemento.value;
    const bairro = form.bairro.value;
    const localidade = form.localidade.value;
    const uf = form.uf.value;

    if (!user || !cep || !logradouro || !bairro || !localidade || !uf) {
      showMessage({
        status: "warning",
        message: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    try {
      const response = await api.addressPost(
        user,
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
          message: "Endereço Cadastrado com Sucesso",
        });
      } else {
        showMessage({
          status: "error",
          message: "Error ao casdastrar novo endereço",
        });
      }
    } catch (error) {
      showMessage({ status: "error", message: error.message });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">Registrar Endereço</h1>
        <div className="flex gap-2">
          <SmartButton
            variant="btnPrimary"
            icon={BsSkipBackwardFill}
            title="Dashboard"
            onClick={() => navigate("/dashboard/address")}
          />
          <SmartButton
            variant="btnInfo"
            icon={BsPersonAdd}
            title="Novo"
            onClick={() => navigate("/dashboard/address-register")}
          />
        </div>
      </div>
      {/* Content Area */}
      <div className="flex flex-col shadow-lg py-10 px-4 sm:rounded-lg bg-white">
        <div className="grid grid-cols-2 gap-4">
          <div className="col border p-8 gap-4 bg-gray-100">
            <SmartForm onSubmit={handleSubmit}>
              <Select
                ref={userRef}
                placeholder="Selecione Cliente..."
                value={selectedUser || {}}
                onChange={(option) => setSelectedUser(option)}
                options={userOptions}
                isSearchable={true}
                className={"mb-4"}
              />
              <SmartInput
                label="CEP"
                name="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={(e) => setCep(e.target.value)}
              />
              <SmartInput
                label="Endereço"
                name="logradouro"
                value={address.logradouro}
                disabled
              />
              <SmartInput
                label="Bairro"
                name="bairro"
                value={address.bairro}
                disabled
              />
              <SmartInput
                label="Complemento"
                name="complemento"
                value={address.complemento}
              />
              <SmartInput
                label="Cidade"
                name="localidade"
                value={address.localidade}
                disabled
              />
              <SmartInput
                label="Estado"
                name="uf"
                value={address.uf}
                disabled
              />
              <SmartButton
                type="submit"
                variant="btnPrimary"
                icon={BsSave2Fill}
                title="Salvar"
              />
            </SmartForm>
          </div>
          <div className="col border p-8 gap-4 bg-gray-100">
            Endereços Cadastrados por Clientes
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressAdd;
