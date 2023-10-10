import React from "react";

const Unauthorized = () => {
  return (
    <div className="bg-red-500 text-white h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">Acesso Não Autorizado</h1>
      <p className="text-lg mt-4">
        Você não tem permissão para acessar esta página.
      </p>
    </div>
  );
};

export default Unauthorized;
