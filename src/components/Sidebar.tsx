import { configureGraz } from "graz";
import { Connection } from ".";
import { OKP4TestnetChain } from "../constants";

configureGraz({
  defaultChain: OKP4TestnetChain,
});


export function Sidebar() {

    return (
    <div className="sidebar">
        <h1>OKP 4 AI</h1>

        <Connection chainInfo={OKP4TestnetChain} />
        <button>Settings</button>
      </div>
    );
}