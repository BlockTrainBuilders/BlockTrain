export function ModelCard({
    title
}: {
    title: string;
}) {
    return (
        <div className="model">
        <h1>{title}</h1>	
        <div>
            Details
        </div>
      </div>
    );
}