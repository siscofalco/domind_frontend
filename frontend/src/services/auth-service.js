import axios from 'axios';

export default class AuthService {
    constructor(){
        console.log(process.env)
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/auth`,
            withCredentials: true
        })
    }

    signup(data){
        return(this.instance.post('/signup-doctor', data)); 
    }

    login(data){
        return(this.instance.post('/login', data));
    }

    logout(){
        return(this.instance.post('/logout'));
    }

    isLoggedIn(){
        return(this.instance.get('/loggedin'));
    }

    edit(data){
        return(this.instance.post('/edit', data));
    }

}