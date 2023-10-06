export function DataCard({
    title,
    description,
    cost,
}: {
    title: string;
    description: string;
    cost: string;
}) {
    const divStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      };

    return (
        <>
            <h1>{title}</h1>	
            <div style={divStyle}>
                <div >
                    {description}
                </div>
                <div>Cost: {cost}</div>
            </div>
      </>
    );
}