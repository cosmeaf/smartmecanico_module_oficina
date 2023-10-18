import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import packageJson from "../../../package.json";
import { ReactComponent as Logo } from "../../image/logo.svg";
import { SmartForm, SmartInput } from "../../components/forms/";
import { showMessage } from "../../components/Notification";
import api from "../../services/api";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passconf, setPassconf] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const password = form.password.value;
    const passconf = form.passconf.value;

    // console.log(
    //   email.length,
    //   first_name.length,
    //   last_name.length,
    //   password.length,
    //   passconf.length
    // );
    const response = await api.signUp(
      email,
      first_name,
      last_name,
      password,
      passconf
    );
    if (response.status) {
      navigate("/", { replace: true, state: { from: location } });
      showMessage({
        status: "success",
        message: "Usuário Criado com Sucuesso",
      });
    } else {
      showMessage({
        status: "error",
        message: `${response.data.error}`,
      });
    }
  };

  useEffect(() => {
    if (
      emailValue.trim().length > 0 &&
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      password.trim().length > 0 &&
      passconf.trim().length > 0
    ) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [emailValue, firstName, lastName, password, passconf]);
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <Logo className="mx-auto w-32 mb-4 mt-10" />
      <h1 className="text-2xl font-semibold mb-6">Novo Usuário</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <SmartForm onSubmit={handleSubmit}>
          <SmartInput
            label="E-mail"
            name="email"
            placeholder="Digite seu e-mail"
            type="email"
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <div className="flex justify-between items-center gap-4">
            <SmartInput
              label="Nome"
              name="first_name"
              placeholder="Nome"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <SmartInput
              label="Sobrenme"
              name="last_name"
              placeholder="Sobrenome"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center gap-4">
            <SmartInput
              label="Senha"
              name="password"
              placeholder="Senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <SmartInput
              label="Confirmar Senha"
              name="passconf"
              placeholder="Confirmar Senha"
              type="password"
              onChange={(e) => setPassconf(e.target.value)}
            />
          </div>
          {isFormComplete ? (
            <button
              type="submit"
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
            >
              Registrar
            </button>
          ) : (
            <button
              type="submit"
              className="w-full p-2 bg-green-300 cursor-not-allowed text-white rounded hover:bg-green-600"
              disabled
            >
              Registrar
            </button>
          )}
        </SmartForm>
        <div className="flex justify-between mt-4">
          <Link
            to="/recovery"
            className="text-green-500 hover:underline text-sm"
          >
            Recuperar Senha
          </Link>
          <Link to="/" className="text-green-500 hover:underline text-sm">
            Já tenho acesso
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-10 text-sm text-green-600">
        <p>Smart Mecânico Modulo Oficina.</p>
        <p>
          Versão:{" "}
          <span className="text-bold text-black">{packageJson.version}</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
