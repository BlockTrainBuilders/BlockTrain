export function Settings() {
    return (
        <div className="mainApp">
        <h1>Settings</h1>	
        <div>
            <table className="table">
                <thead>
                    <tr>
                    <th>Users</th>
                    <th>Can train AI</th>
                    <th>Can deploy</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Clyde</td>
                    <td>Yes</td>
                    <td>Yes</td>
                </tr>
                <tr>
                    <td>Vaughn</td>
                    <td>No</td>
                    <td>No</td>
                </tr>
                </tbody>
            </table>
        </div>
      </div>
    );
}