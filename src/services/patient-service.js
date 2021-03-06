import axios from 'axios';

export default class PatientService {
    constructor(){
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/patient`,
            withCredentials: true
        })
    }

    getPatient(id){
        return(this.instance.get(`/${id}`));
    }

    editPatient(id, body) {
        return(this.instance.put(`/edit/${id}`, body))
    }

    deletePatient(id) {
        return(this.instance.delete(`/${id}`))
    }
}