import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const PieChart = () => {
  return (
    <div className="h-full flex justify-between items-center p-8">
      <div className="flex flex-col space-y-2">
        {data.labels.map((label, index) => (
          <div key={label} className="flex items-center">
            <div
              className="w-10 h-4 mr-2 "
              style={{
                backgroundColor: data.datasets[0].backgroundColor[index],
              }}
            ></div>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="w-2/3 h-2/3 flex items-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
