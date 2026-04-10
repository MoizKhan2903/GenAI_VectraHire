import { createContext, useState, useEffect } from "react";
import {getMe} from "./services/auth.api"

// context layer is used to provide the authentication state and functions to the entire application. It allows us to share the authentication state and functions across all components without having to pass them down through props. It also allows us to manage the authentication state in a centralized location, making it easier to maintain and update.

export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true)

useEffect(() => {
    const getAndSetUser = async () => {
        try {
            const data = await getMe();

            if (data && data.user) {
                setUser(data.user);
            } else {
                setUser(null);  // ✅ handle unauthenticated case
            }

        } catch (error) {
            console.log(error);
            setUser(null);
        } finally {
            setLoading(false); // ✅ always stop loading
        }
    };

    getAndSetUser();
}, []);


return (
    <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
        {children}
    </AuthContext.Provider>
)

}