import { yamlFile } from "../constants";

export function AkashParameters() {
    const divStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      };

    return (
        <>
        <h2>Deployment preview</h2>
        <div className="model">
            <div style={divStyle}>
              {yamlFile}
            </div>
        </div>
        
      </>
    );
}