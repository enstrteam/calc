import "./custom.scss";
import { Builder } from "./components/Builder";
import { CaclProvider } from "./components/CalcProvider";

function App() {

  return (
    <CaclProvider>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <Builder />
      </div>
    </CaclProvider>
  );
}

export default App;
