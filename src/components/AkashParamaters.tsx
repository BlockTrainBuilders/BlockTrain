import { yamlFile } from "../constants";

export function AkashParameters({
    dataset,
}: {
    dataset: string;
}) {
    const divStyle = {
        display: 'flex',
        
        justifyContent: 'space-between',
        alignItems: 'start',
        padding: '10px',
      };

    return (
        <>
        <h2>Deployment preview</h2>
        <div className="model">
        <div>Deployment name: {dataset}</div>
            <div style={divStyle}>
                {yamlFile}
            </div>
        </div>
        
      </>
    );
}