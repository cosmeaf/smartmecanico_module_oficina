import React, { useState } from "react";
import { IoCarSportOutline } from "react-icons/io5";
import { BsBuildingGear } from "react-icons/bs";
import { VscTools } from "react-icons/vsc";
import { AiOutlineUser } from "react-icons/ai";

const TopCards = () => {
  const cardList = [
    {
      name: "Clientes Registrados",
      link: "/dashboard",
      icon: AiOutlineUser,
      value: "1,589",
      percentage: "+18%",
      color: "green",
    },
    {
      name: "Agendamentos da Semana",
      link: "/dashboard",
      icon: BsBuildingGear,
      value: "34",
      percentage: "+11%",
      color: "green",
    },
    {
      name: "Menutenções Programadas",
      link: "/dashboard",
      icon: IoCarSportOutline,
      value: "820",
      percentage: "+17%",
      color: "green",
    },
    {
      name: "Revisão / Serviços",
      link: "/dashboard",
      icon: VscTools,
      value: "3,420",
      percentage: "+5%",
      color: "green",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 gap-4 p-4">
      {cardList.map((card) => (
        <div
          key={card.name}
          className="bg-white flex justify-between w-full border p-4 rounded-lg"
        >
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-gray-600">{card.name}</p>
          </div>
          <p
            className={`bg-${card.color}-100 flex justify-center items-center py-1 px-3 rounded-lg`}
          >
            <span className={`text-${card.color}-700 text-lg`}>
              {card.percentage}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default TopCards;
