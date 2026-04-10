import axios from "axios"


// created this so that we don't want to write the base url and with credentials every time we make a request to the backend. 
// We can just use this instance of axios and it will automatically include the base url and with credentials in every request.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
     withCredentials:true
})

export async function register({username, email, password}){

try {
const response = await api.post('/api/auth/register', {
    username,
    email,
    password    
})

return response.data;

} catch (err){

    console.log(err);

}
}

export async function login({email, password}){
    try{
        const response = await api.post('/api/auth/login', {
            email,
            password
        })

        return response.data;

    } catch (err){
        console.log(err);
    }
}

export async function logout(){
    try{
        const response = await api.get('/api/auth/logout')

        return response.data;

    } catch (err){  
        console.log(err);
    }
}

export async function getMe(){
    try{
        const response = await api.get('/api/auth/getMe')

        return response.data;

    } catch (err){
        console.log(err);
         return null;
    }
}