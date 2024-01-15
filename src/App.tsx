import { SpinnerContainer } from "./components/spinner/spinner-container";
import { UserDetails } from "./components/user-details/user-details";

import { useSpinnerContext } from "./context/spinner-context";

import "./App.scss";

function App() {
    const { isSpinnerReadyToSpin } = useSpinnerContext();
    return (
        <div className="layout">
            <div
                style={{
                    minWidth: isSpinnerReadyToSpin ? "60dvw" : "40dvw",
                    transition: "min-width 0.2s ease-in-out",
                }}
                className="left-side"
            >
                <SpinnerContainer />
            </div>
            <div
                style={{
                    minWidth: isSpinnerReadyToSpin ? "40dvw" : "60dvw",
                    transition: "min-width 0.2s ease-in-out",
                }}
                className="right-side"
            >
                <UserDetails />
            </div>
        </div>
    );
}

export default App;
