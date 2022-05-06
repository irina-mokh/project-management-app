import Button from "@mui/material/Button";
import { Header } from "../Header/Header";
import "./app.scss";
function App() {
  return (
    <div className="App" data-testid="app">
      <Header />
      <Button variant="outlined">Hello World</Button>
    </div>
  );
}

export default App;
