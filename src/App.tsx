import { configureGraz } from "graz";
import "./App.css";
import {
  OKP4TestnetChain,
} from "./constants";
import { Sidebar } from "./components/Sidebar";

configureGraz({
  defaultChain: OKP4TestnetChain,
});

function App() {
  return (
    <>
    <Sidebar />
    <div className="mainApp">
      <h1>Settings</h1>	
    </div>

    </>
  );
}

export default App;