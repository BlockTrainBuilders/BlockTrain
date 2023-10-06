import { configureGraz } from "graz";
import "./App.css";
import {
  OKP4TestnetChain, 
} from "./constants";
import { Sidebar } from "./components/Sidebar";
import AppRouter from './components/AppRouter';

configureGraz({
  defaultChain: OKP4TestnetChain,
});


function App() {
  return (
    <>
    <Sidebar />
    <AppRouter />
    </>
  );
}

export default App;