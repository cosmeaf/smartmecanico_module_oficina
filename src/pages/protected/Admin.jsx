import React from "react";
import TopCards from "../../components/TopCards";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";

const Admin = () => {
  return (
    <div>
      <TopCards />
      <div className="flex flex-row justify-between space-x-4 px-4">
        <div className="w-2/3 bg-white border shadow-lg rounded-md">
          <BarChart />
        </div>
        <div className="w-1/3 bg-white border shadow-lg rounded-md">
          <h1 className="text-center mt-5">Resumo de Serviços Executados</h1>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Admin;
