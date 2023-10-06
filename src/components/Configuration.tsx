import { Sidebar } from "./Sidebar";

export function Configuration() {
    return (
        <>
        <Sidebar />
        <div className="mainApp">
            <h1>Customize Configuration</h1>	
            <div>
                Edit the configuration file here.
            </div>
      </div>
      </>
    );
}