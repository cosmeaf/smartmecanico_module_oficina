import React from "react";

const Error404 = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-gray-800 text-9xl font-bold tracking-wide animate-pulse">
        404
      </div>
      <div className="text-xl mt-4 text-gray-600">Página não encontrada</div>
      <p className="mt-2 text-gray-500">
        Parece que você está tentando acessar uma página que não existe ou foi
        movida.
      </p>
    </div>
  );
};

export default Error404;
