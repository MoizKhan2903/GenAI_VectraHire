import { useAuth} from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'


// we will use this component to wrap protected routes. If the user is not authenticated, we will redirect them to the login page. If the user is authenticated, we will render the children components.
const Protected = ({children}) => {
    const {loading, user} = useAuth()

    if(loading) {
        return (<main>
            <h1>Hold on...</h1>
        </main>)
    }

    if(!user) {
        return <Navigate to={"/login"} />
       return null
    }

  return children
}

export default Protected