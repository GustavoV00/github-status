import React from "react";

import { Bar } from "react-chartjs-2";

const Chart = ({ chartData, title }) => {
  return (
    <div>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: { title },
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
