import { createContext, useState } from "react";



export const AccountContext = createContext();

export default function AccountProvider({children}){

    // ! for account info
    const [account, setAccount] = useState();
    
    return(
        <AccountContext.Provider value={
            {
                account,
                setAccount,
            }
        }>{children}</AccountContext.Provider>
    );
}