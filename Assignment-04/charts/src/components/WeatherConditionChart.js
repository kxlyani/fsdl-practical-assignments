import { Doughnut } from "react-chartjs-2";

const WeatherConditionChart = () => {
  const data = {
    labels: ["Sunny", "Cloudy", "Rainy"],
    datasets: [
      {
        data: [4, 2, 1],
        backgroundColor: ["#f9c74f", "#90dbf4", "#577590"],
      },
    ],
  };

  return (
    <div className="chart-card">
      <h3>Weather Distribution</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default WeatherConditionChart;
