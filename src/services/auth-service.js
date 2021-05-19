import axios from 'axios';

export default class AuthService {
    constructor(){
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/auth`,
            withCredentials: true
        })
    }

    signupPatient(data){
        return(this.instance.post('/signup-patient', data)); 
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