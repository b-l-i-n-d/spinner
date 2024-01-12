import React, { createContext, useContext } from "react";
import { IUsers } from "../types/types";

interface IUserContext {
    users: IUsers;
    setUsers: React.Dispatch<React.SetStateAction<IUsers>>;
}

const UserContext = createContext<IUserContext>({
    users: {},
    setUsers: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [users, setUsers] = React.useState<IUsers>({});

    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    );
};
