import axios from 'axios';

export default class SessionService {
    constructor(){
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/doctor-session`,
            withCredentials: true
        })
    }

    createSession(body){
        return(this.instance.post('/create', body));
    }

    getSession(id){
        return(this.instance.get(`/${id}`));
    }

    deleteSession(id) {
        return(this.instance.delete(`/${id}`))
    }
}
