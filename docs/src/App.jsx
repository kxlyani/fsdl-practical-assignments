import { ThemeProvider } from "./context/ThemeContext";
import Portfolio from "./pages/Portfolio";

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}
