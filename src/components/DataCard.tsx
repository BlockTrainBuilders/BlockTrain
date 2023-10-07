export function DataCard({
    title,
    description,
    cost,
    author,
}: {
    title: string;
    description: string;
    cost: string;
    author: string
}) {
    const divStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      };

    return (
        <>
            <h1>{title}</h1>
            <div >
                    {description}
                </div>	
            <div style={divStyle}>
            <div>Author: {author}</div>
                <div>Cost: {cost}</div>
            </div>
            
      </>
    );
}