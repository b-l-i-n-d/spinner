import "./App.scss";
import { SpinWheel } from "./components/spinner/spin-wheel";
import { UserDetails } from "./components/user-details/user-details";

function App() {
    return (
        <div className="layout">
            <div className="left-side">
                <SpinWheel />
            </div>
            <div className="right-side">
                <UserDetails />
            </div>
        </div>
    );
}

export default App;
