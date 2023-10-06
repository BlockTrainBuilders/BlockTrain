import { configureGraz } from "graz";
import "./App.css";
import {
  OKP4TestnetChain, 
} from "./constants";
import AppRouter from './components/AppRouter';

configureGraz({
  defaultChain: OKP4TestnetChain,
});


function App() {
  return (
    <>
    <AppRouter />
    </>
  );
}

export default App;