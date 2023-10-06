import { ModelCard } from "./ModelCard";
import { Sidebar } from "./Sidebar";

export function Models() {
    return (
        <>
        <Sidebar />
        <div className="mainApp">
        <h1>Available AI Models</h1>	
        <div>
            <ModelCard title="Model 1" />
            <ModelCard title="Model 2"/>
        </div>
        <div>
            <input type="text" placeholder="Model Name" />
            <button>Create New Model</button>
        </div>
      </div>
      </>
    );
}