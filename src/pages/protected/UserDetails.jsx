import React, { useEffect, useState } from "react";
import { BsSkipBackwardFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import SmartButton from "../../components/buttons/SmartButton";
import api from "../../services/api";

const UserDetails = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  function formatDateWithTime(timestamp) {
    const datePart = timestamp.split("T")[0].split("-").reverse().join("/");
    const timePart = timestamp.split("T")[1].split("Z")[0];
    return `${datePart} ${timePart}`;
  }

  const userData = {
    id: "b024645c-e487-443a-9f57-9b119d3bab5e",
    address: [
      {
        id: "641e57a3-b239-4172-bf03-2d90a33d63a0",
        created_at: "2023-10-13T14:46:32.082000Z",
        updated_at: "2023-10-13T14:46:32.082000Z",
        deleted_at: null,
        cep: "20710-130",
        logradouro: "Rua Lins de Vasconcelos",
        complemento: "542, Apartamento 302",
        bairro: "Lins de Vasconcelos",
        localidade: "Rio de Janeiro",
        uf: "RJ",
        user: "b024645c-e487-443a-9f57-9b119d3bab5e",
      },
    ],
    vehicles: [
      {
        id: "1b1ea8ea-7275-4c7b-8d08-5b0c833527dc",
        created_at: "2023-10-13T15:03:39.060000Z",
        updated_at: "2023-10-13T15:03:39.060000Z",
        deleted_at: null,
        brand: "Honda",
        model: "Civic Lxs 2.0 Mec 4P",
        fuel: "Gasolina",
        year: "2014",
        odometer: "130542",
        plate: "LQV1965",
        user: "b024645c-e487-443a-9f57-9b119d3bab5e",
      },
    ],
    last_login: null,
    is_superuser: false,
    created_at: "2023-10-13T14:20:35.808000Z",
    updated_at: "2023-10-13T22:21:19.130000Z",
    deleted_at: null,
    email: "cosmeaf@gmail.com",
    password:
      "pbkdf2_sha256$600000$J6fI4okukSNpPEYswBsnOS$WGFMLojc1/1fYgZGcIDmYLS8p/w6Yo+yruonYL29i34=",
    first_name: "Cosme",
    last_name: "Alves",
    image: null,
    bio: "",
    birthday: "1999-01-01",
    phone_number: "+5521996458022",
    is_active: true,
    is_staff: false,
    failed_login_attempts: 0,
    last_failed_login: "2023-10-13T14:36:35Z",
    groups: [],
    user_permissions: [],
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.getUserByIdAllData(id);
        if (response.status) {
          setUser(response.data);
        } else {
          console.error("Erro ao buscar dados do usuário");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário", error);
      }
    }

    fetchData();
  }, [id]);

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className="content p-4 md:p-4 lg:w-full max-w-1200 mx-auto min-h-screen">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">Detalhes do Cliente</h1>
        <div className="flex gap-2">
          <SmartButton
            variant="btnPrimary"
            icon={BsSkipBackwardFill}
            title="Voltar"
            onClick={() => navigate("/dashboard/user/")}
          />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 flex">
        {/* Coluna da esquerda */}
        <div className="w-1/4 pr-4 flex flex-col items-center">
          <img
            src={
              user?.image ||
              "https://bootdey.com/img/Content/avatar/avatar7.png"
            }
            alt=""
            width={200}
            height={200}
            className="mb-4"
          />

          <strong>Último Acesso:</strong>
          <p>Último Acesso: {user?.last_failed_login}</p>
        </div>

        <div className="w-3/4 pl-4 flex">
          <div className="w-1/3 pr-4">
            <p className="mb-4 font-bold text-xl">Dados Cleinte:</p>
            <p>
              Nome: {user?.first_name} {user?.last_name}
            </p>
            <p>Telefone: {user?.phone_number}</p>
            <p>Data de Nascimento: {user?.birthday}</p>
          </div>

          {user?.address && (
            <div className="w-1/3 pr-4">
              <p className="mb-4 font-bold text-xl">Dados Endereço:</p>
              <p>CEP: {user?.address[0]?.cep}</p>
              <p>Logradouro: {user?.address[0]?.logradouro}</p>
              <p>Complemento: {user?.address[0]?.complemento}</p>
              <p>Bairro: {user?.address[0]?.bairro}</p>
              <p>Cidade: {user?.address[0]?.localidade}</p>
              <p>UF: {user?.address[0]?.uf}</p>
            </div>
          )}

          {user?.vehicles && (
            <div className="w-1/3">
              <p className="mb-4 font-bold text-xl">Dados Veículo:</p>
              <p>Marca: {user?.vehicles[0]?.brand}</p>
              <p>Modelo: {user?.vehicles[0]?.model}</p>
              <p>Combustível: {user?.vehicles[0]?.fuel}</p>
              <p>Ano: {user?.vehicles[0]?.year}</p>
              <p>Hodômetro: {user?.vehicles[0]?.odometer}</p>
              <p>Placa: {user?.vehicles[0]?.plate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
