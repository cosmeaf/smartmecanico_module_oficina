import React from "react";
import SmartForm from "../../components/forms/SmartForm";
import SmartInput from "../../components/forms/SmartInput";
import { BsFillSave2Fill } from "react-icons/bs";
import SmartButton from "../../components/buttons/SmartButton";

const UserRegister = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    for (let [name, value] of formData.entries()) {
      console.log(name, value);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-8">
      <div>
        <h1>FORMULÁRIO DE CADASTRO DE CLIENTES</h1>
        <SmartForm onSubmit={handleSubmit}>
          <SmartInput
            label="Nome"
            name="username"
            placeholder="Digite seu Nome"
            type="text"
          />
          <SmartInput
            label="Sobrenme"
            name="username"
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
            name="username"
            placeholder="Digite seu telefone"
            type="text"
          />
          <SmartButton
            variant="btnPrimary"
            icon={BsFillSave2Fill}
            title="Cadastrar"
            onClick={() => handleSubmit}
          />
        </SmartForm>
      </div>
    </div>
  );
};

export default UserRegister;
