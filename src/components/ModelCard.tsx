export function ModelCard({
    title,
    usage,
    size,
    license,
    downloads,
    allowed,
}: {
    title: string;
    usage: string;
    size: string;
    license: string;
    downloads: string;
    allowed: boolean;
}) {
    const divStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      };
    
    const notAllowed = {
        color: 'red',
        padding: '10px',
        border: '1px solid red',
        borderRadius: '5px',
      };

    return (
        <>
            <h1>{title}</h1>	
            <div style={divStyle}>
                <div >
                    <div>
                        Usage: {usage}
                    </div>
                    <div>
                        Size: {size}
                    </div>
                    <div>
                        License: {license}
                    </div>
                    <div>Downloads: {downloads}</div>
                </div>
                {!allowed && <div style={notAllowed}>Not accessible</div>}
                
                {/* <div style={{ fill: 'red' }}>
                <img src={DownloadIcon} alt="DowloadIcon" className='octicon' />
                    
                </div> */}
            </div>
      </>
    );
}