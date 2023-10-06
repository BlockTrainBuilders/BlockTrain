import { configureGraz } from "graz";
import {
  Connection
} from "./components";
import "./App.css";
import {
  OKP4TestnetChain,
} from "./constants";

configureGraz({
  defaultChain: OKP4TestnetChain,
});

function App() {
  return (
    <>
      <h1>OKP4 Vite Starter</h1>

      <Connection chainInfo={OKP4TestnetChain} />

    </>
  );
}

export default App;