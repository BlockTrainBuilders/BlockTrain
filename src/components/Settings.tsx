import { Sidebar } from "./Sidebar";

export function Settings() {
    return (
        <>
        <Sidebar />
        <div className="mainApp">
        <h1>Access Settings</h1>	
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
                <tr>
                    <td>Mauritz</td>
                    <td>Yes (maybe)</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td>Eliseo</td>
                    <td>No</td>
                    <td>Yes</td>
                </tr>
                <tr>
                    <td>Anja</td>
                    <td>Definitely not 😎</td>
                    <td>Easy 💤🍹🌞</td>
                </tr>
                </tbody>
            </table>
        </div>
      </div>
      </>
    );
}