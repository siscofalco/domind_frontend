import axios from 'axios';

export default class DoctorService {
    constructor(){
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/doctor`,
            withCredentials: true
        })
    }

    getDoctor(id){
        return(this.instance.get(`/${id}`));
    }

    editDoctor(body) {
        return(this.instance.put(body))
    }
}