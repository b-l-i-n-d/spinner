import { createContext, useContext, useState } from "react";
import { ISpinnerData } from "../types/types";

interface ISpinnerContext {
    isSpinnerReadyToSpin: boolean;
    isSpinning: boolean;
    spinnerData: ISpinnerData;
    setSpinnerData: React.Dispatch<React.SetStateAction<ISpinnerData>>;
    setIsSpinnerReadyToSpin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSpinning: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpinnerContext = createContext<ISpinnerContext>({
    spinnerData: {
        discount: [],
        duration: 0,
    },
    isSpinning: false,
    isSpinnerReadyToSpin: false,
    setSpinnerData: () => {},
    setIsSpinnerReadyToSpin: () => {},
    setIsSpinning: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSpinnerContext = () => {
    return useContext(SpinnerContext);
};

export const SpinnerProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [spinnerData, setSpinnerData] = useState<ISpinnerData>({
        discount: [
            {
                id: "1",
                label: "5%",
                discount: 5,
                color: "#3498db",
                type: "percent",
            },
            {
                id: "2",
                label: "10%",
                discount: 10,
                color: "#e74c3c",
                type: "percent",
            },
            {
                id: "3",
                label: "15%",
                discount: 15,
                color: "#2ecc71",
                type: "percent",
            },
            {
                id: "4",
                label: "20%",
                discount: 20,
                color: "#f39c12",
                type: "percent",
            },
            {
                id: "5",
                label: "25%",
                discount: 25,
                color: "#9b59b6",
                type: "percent",
            },
        ],
        duration: 300,
    });

    const [isSpinnerReadyToSpin, setIsSpinnerReadyToSpin] =
        useState<boolean>(false);

    const [isSpinning, setIsSpinning] = useState<boolean>(false);

    return (
        <SpinnerContext.Provider
            value={{
                spinnerData,
                isSpinnerReadyToSpin,
                isSpinning,
                setSpinnerData,
                setIsSpinnerReadyToSpin,
                setIsSpinning,
            }}
        >
            {children}
        </SpinnerContext.Provider>
    );
};
