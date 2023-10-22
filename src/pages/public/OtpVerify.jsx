import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import packageJson from "../../../package.json";
import { ReactComponent as Logo } from "../../image/logo.svg";
import { showMessage } from "../../components/Notification";
import { SmartForm, SmartOtpInput } from "../../components/forms";
import api from "../../services/api";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");

  const [isFormComplete, setIsFormComplete] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (otp.trim().length > 5) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [otp]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await api.otpValidation(otp);
    if (data.status) {
      const token = data.data.token;
      navigate(`/change-password/`, {
        replace: true,
        state: { from: location, token: token },
      });
      showMessage({
        status: "success",
        message: `${data?.data.message}`,
      });
    } else if (data.data.error) {
      showMessage({
        status: "error",
        message: `${data.data.error}`,
      });
    } else {
      console.log(data);
      showMessage({
        status: "error",
        message: `${data.message}`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <Logo className="mx-auto w-32 mb-4 mt-10" />
      <h1 className="text-2xl text-green-700 font-semibold mb-6">
        Smart Mecânico
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <SmartForm onSubmit={handleSubmit}>
          <SmartOtpInput
            label="Código Único de Verificaçao"
            name="otp"
            value={otp}
            type="otp"
            onChange={(value) => setOtp(value)}
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
          <Link
            to="/recovery"
            className="text-green-500 hover:underline text-sm"
          >
            Nova Solicitaçao
          </Link>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 mb-3 flex flex-col justify-center items-center text-sm text-green-600">
        <p>Smart Mecânico Modulo Oficina.</p>
        <p>
          Versão:
          <span className="font-bold text-black">{packageJson.version}</span>
        </p>
      </div>
    </div>
  );
};

export default OtpVerify;
