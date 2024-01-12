import "./App.scss";
import { Spinner } from "./components/spinner/spinner";
import { UserDetails } from "./components/user-details/user-details";

function App() {
    return (
        <div className="layout">
            <div className="left-side">
                <Spinner />
            </div>
            <div className="right-side">
                <UserDetails />
            </div>
        </div>
    );
}

export default App;
