import React from "react";
import SmartForm from "../../components/forms/SmartForm";
import SmartInput from "../../components/forms/SmartInput";
import { BsFillSave2Fill, BsSkipBackwardFill } from "react-icons/bs";
import SmartButton from "../../components/buttons/SmartButton";
import api from "../../services/api";
import { showMessage } from "../../components/Notification";
import { useLocation, useNavigate } from "react-router-dom";

const UserRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const phone_number = form.phone_number.value;

    try {
      const response = await api.postUser(
        email,
        first_name,
        last_name,
        phone_number
      );
      if (response.status) {
        navigate("/dashboard", { replace: true, state: { from: location } });
        showMessage({
          status: "success",
          message: "Login realizado com sucesso!",
        });
      } else {
        showMessage({
          status: "error",
          message: "Ocorreu um erro ao realizar o login.",
        });
      }
    } catch (error) {
      showMessage({ status: "error", message: error.message });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">Cadastro de Cliente</h1>
        <div className="flex gap-2">
          <SmartButton
            variant="btnPrimary"
            icon={BsSkipBackwardFill}
            title="User"
            onClick={() => navigate("/dashboard/user")}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-8">
        <div>
          <h1>FORMULÁRIO DE CADASTRO DE CLIENTES</h1>
          <SmartForm onSubmit={handleSubmit}>
            <SmartInput
              label="Nome"
              name="first_name"
              placeholder="Digite seu Nome"
              type="text"
            />
            <SmartInput
              label="Sobrenme"
              name="last_name"
              placeholder="Digite seu Sobrenome"
              type="text"
            />
            <SmartInput
              label="Email"
              name="email"
              placeholder="Digite seu e-mail"
              type="email"
            />
            <SmartInput
              label="Telefone"
              name="phone_number"
              placeholder="Digite seu telefone"
              type="phone" // Mudança aqui para usar a validação de telefone
            />
            <SmartButton
              type="submit" // Mudança aqui
              variant="btnPrimary"
              icon={BsFillSave2Fill}
              title="Cadastrar"
            />
          </SmartForm>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
