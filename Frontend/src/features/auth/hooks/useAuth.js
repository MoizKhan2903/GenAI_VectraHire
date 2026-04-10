import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {login, register, logout, getMe} from "../services/auth.api";

// hook layer is used to access the context values in a more convenient way, it manages the state of the user and loading status, and provides a way to update them. It abstracts away the details of how the context is implemented, allowing components to simply call useAuth() to get access to the authentication state and functions.
export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context


    const handleLogin = async ({email, password}) => {
        setLoading(true)
        try{
            const data = await login({email, password})
            setUser(data.user)
        } catch (error) {
            console.error("Login failed:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({username, email, password}) => {
        setLoading(true)
        try{
            const data = await register({username, email, password})
            setUser(data.user)
        } catch (error) {
            console.error("Register failed:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try{
        const data = await logout()
        setUser(null)
    } catch (error) {
        console.error("Logout failed:", error)
    } finally {
        setLoading(false)
    }
    }

    // This useEffect is used to check if the user is already logged in when the component mounts. It calls the getMe function to get the current user's information and sets the user state accordingly. It also sets the loading state to false once the user information is retrieved.
   

   return {user, loading, handleLogin, handleRegister, handleLogout}
}