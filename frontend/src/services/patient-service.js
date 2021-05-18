import axios from 'axios';

export default class DoctorService {
    constructor(){
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/patient`,
            withCredentials: true
        })
    }

    getPatient(id){
        return(this.instance.get(`/${id}`));
    }

    editPatient(body) {
        return(this.instance.put(body))
    }
}