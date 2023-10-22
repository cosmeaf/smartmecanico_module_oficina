import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import packageJson from "../../../package.json";
import { ReactComponent as Logo } from "../../image/logo.svg";
import { showMessage } from "../../components/Notification";
import { SmartForm, SmartInput } from "../../components/forms";
import api from "../../services/api";

const Recovery = () => {
  const [email, setEmail] = useState("");

  const [isFormComplete, setIsFormComplete] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (email.trim().length > 0) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await api.recoveryPassword(email);

    if (data.status) {
      navigate("/otp-verify", { replace: true, state: { from: location } });
      showMessage({
        status: "success",
        message: "Solicitação envida com sucesso",
      });
    } else {
      showMessage({
        status: "error",
        message: "Falha na solicitação, Tente mais tarde",
      });
      console.log(data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <Logo className="mx-auto w-32 mb-4 mt-10" />
      <h1 className="text-2xl font-semibold mb-6">Bem Vindo de volta</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <SmartForm onSubmit={handleSubmit}>
          <SmartInput
            label="E-mail"
            name="email"
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {isFormComplete ? (
            <button
              type="submit"
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
            >
              Enviar
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
          <Link to="/" className="text-green-500 hover:underline">
            Já tenho Registro
          </Link>
          <Link to="/register" className="text-green-500 hover:underline">
            Não tenho Registro
          </Link>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center text-sm text-green-600">
        <p>Smart Mecânico Modulo Oficina.</p>
        <p>
          Versão:
          <span className="font-bold text-black">{packageJson.version}</span>
        </p>
      </div>
    </div>
  );
};

export default Recovery;
