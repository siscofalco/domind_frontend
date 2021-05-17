import axios from 'axios';

export default class DoctorService {
    constructor(){
        console.log(process.env)
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