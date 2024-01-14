import { createContext, useContext, useState } from "react";
import { ISpinnerData } from "../types/types";

interface ISpinnerContext {
    spinnerData: ISpinnerData;
    setSpinnerData: React.Dispatch<React.SetStateAction<ISpinnerData>>;
}

const SpinnerContext = createContext<ISpinnerContext>({
    spinnerData: [],
    setSpinnerData: () => {},
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
    const [spinnerData, setSpinnerData] = useState<ISpinnerData>([
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
    ]);

    return (
        <SpinnerContext.Provider value={{ spinnerData, setSpinnerData }}>
            {children}
        </SpinnerContext.Provider>
    );
};
