import React, { useState, useEffect } from "react";
import { SmartForm, SmartInput } from "../../components/forms";
import {
  BsFillSave2Fill,
  BsPersonAdd,
  BsSkipBackwardFill,
} from "react-icons/bs";
import SmartButton from "../../components/buttons/SmartButton";
import api from "../../services/api";
import { showMessage } from "../../components/Notification";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UserUpdate = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    birthday: "",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await api.getUserById(id);
      if (response.status) {
        setUserData(response.data);
      } else {
        showMessage({
          status: "error",
          message: "Ocorreu um erro ao carregar os dados do usuário.",
        });
      }
    }

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const id = form.id.value;
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const email = form.email.value;
    const phone_number = form.phone_number.value;

    try {
      const response = await api.patchUser(
        id,
        email,
        first_name,
        last_name,
        phone_number
      );

      if (response.status) {
        navigate("/dashboard/user", {
          replace: true,
          state: { from: location },
        });
        showMessage({
          status: "success",
          message: "Usuário atualizado com sucesso!",
        });
      } else {
        showMessage({
          status: "error",
          message: "Ocorreu um erro ao atualizar o usuário.",
        });
      }
    } catch (error) {
      showMessage({ status: "error", message: error.message });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">Detalhes de Cliente</h1>
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
          <h1>FORMULÁRIO DE ATUALIZAÇÃO DE DADOS</h1>
          <SmartForm onSubmit={handleSubmit}>
            <SmartInput name="id" value={userData.id || ""} type="hidden" />
            <SmartInput
              label="Nome"
              name="first_name"
              value={userData.first_name}
              type="text"
            />
            <SmartInput
              label="Sobrenome"
              name="last_name"
              value={userData.last_name}
              type="text"
            />
            <SmartInput
              label="Email"
              name="email"
              value={userData.email}
              type="email"
            />
            <SmartInput
              label="Telefone"
              name="phone_number"
              value={userData.phone_number}
              type="phone"
            />
            <SmartInput
              label="Data de Nascimento"
              name="birthday"
              value={userData.birthday}
              type="date"
            />
            <SmartButton
              type="submit"
              variant="btnPrimary"
              icon={BsFillSave2Fill}
              title="Atualizar"
            />
          </SmartForm>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
