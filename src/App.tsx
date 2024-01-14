import "./App.scss";
import { SpinnerContainer } from "./components/spinner/spinner-container";
import { UserDetails } from "./components/user-details/user-details";

function App() {
    return (
        <div className="layout">
            <div className="left-side">
                <SpinnerContainer />
            </div>
            <div className="right-side">
                <UserDetails />
            </div>
        </div>
    );
}

export default App;
