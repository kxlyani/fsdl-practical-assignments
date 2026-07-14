import { Line } from "react-chartjs-2";

const TemperatureChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [28, 30, 29, 31, 33, 32, 34],
        borderColor: "orange",
        backgroundColor: "rgba(255,165,0,0.3)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="chart-card">
      <h3>Weekly Temperature</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default TemperatureChart;
