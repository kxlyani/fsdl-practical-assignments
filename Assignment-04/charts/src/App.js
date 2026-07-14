import "./App.css";
import "./chartSetup";
import RainfallChart from "./components/RainfallChart";
import TemperatureChart from "./components/TempuratureChart";
import WeatherConditionChart from "./components/WeatherConditionChart";

function App() {
  return (
    <div className="app">
      <h1>🌤 Weather Dashboard</h1>

      <div className="charts">
        <TemperatureChart />
        <RainfallChart />
        <WeatherConditionChart />
      </div>
    </div>
  );
}

export default App;
