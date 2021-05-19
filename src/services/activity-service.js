import axios from 'axios';

export default class ActivityService {
    constructor(){
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/activity`,
            withCredentials: true
        })
    }

    createActivity(body){
        return(this.instance.post('/create', body))
    }

    getActivity(id){
        return(this.instance.get(`/${id}`));
    }

    editActivity(id, body) {
        return(this.instance.put(`/edit/${id}`, body))
    }

    deleteActivity(id) {
        return(this.instance.delete(`/${id}`));
    }
}

