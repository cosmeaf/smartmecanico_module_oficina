import React from "react";
import { BsSkipBackwardFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const btnPrimary =
  "flex justify-between items-center gap-2 bg-green-500 py-1 px-3 text-white rounded-md hover:bg-green-600 transition-all duration-250 ease-in-out";

const ButtonBack = () => {
  return (
    <Link className={btnPrimary} to="/dashboard">
      <BsSkipBackwardFill size={20} /> Voltar
    </Link>
  );
};

export default ButtonBack;
