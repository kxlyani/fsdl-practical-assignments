import { Bar } from "react-chartjs-2";

const RainfallChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Rainfall (mm)",
        data: [5, 12, 0, 8, 15, 20, 10],
        backgroundColor: "rgba(54,162,235,0.7)",
      },
    ],
  };

  return (
    <div className="chart-card">
      <h3>Weekly Rainfall</h3>
      <Bar data={data} />
    </div>
  );
};

export default RainfallChart;
