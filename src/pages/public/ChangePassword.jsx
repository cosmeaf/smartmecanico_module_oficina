import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import packageJson from "../../../package.json";
import { ReactComponent as Logo } from "../../image/logo.svg";
import { SmartForm, SmartInput } from "../../components/forms/";
import { showMessage } from "../../components/Notification";
import api from "../../services/api";

const ChangePassword = () => {
  const location = useLocation();
  const token = location.state?.token;
  const navigate = useNavigate();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passconf, setPassconf] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const passconf = form.passconf.value;

    const response = await api.changePassword(password, passconf, token);
    if (response.status) {
      navigate("/", { replace: true, state: { from: location } });
      showMessage({
        status: "success",
        message: `${response.data.message}`,
      });
    } else if (response.data.detail) {
      showMessage({
        status: "error",
        message: `${response.data.detail}`,
      });
    } else {
      showMessage({
        status: "warning",
        message: "Faça nova Solicitação",
      });
    }
  };

  useEffect(() => {
    if (password.trim().length >= 8 && passconf.trim().length >= 8) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [password, passconf]);
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <Logo className="mx-auto w-32 mb-4 mt-10" />
      <h1 className="text-2xl font-semibold mb-6">Novo Usuário</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <SmartForm onSubmit={handleSubmit}>
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

          {isFormComplete ? (
            <button
              type="submit"
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
            >
              Criar Nova Senha
            </button>
          ) : (
            <button
              type="submit"
              className="w-full p-2 bg-green-300 cursor-not-allowed text-white rounded hover:bg-green-600"
              disabled
            >
              Bloqueado
            </button>
          )}
        </SmartForm>
        <div className="flex justify-between mt-4">
          <Link
            to="/recovery"
            className="text-green-500 hover:underline text-sm"
          >
            Nova solicitaçao?
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-10 text-sm text-green-600">
        <p>Smart Mecânico Modulo Oficina.</p>
        <p>
          Versão:
          <span className="text-bold text-black">{packageJson.version}</span>
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;
