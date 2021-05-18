import axios from 'axios';

export default class DiaryService {
    constructor(){
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/diary`,
            withCredentials: true
        })
    }

    createDiary(body){
        return(this.instance.post('/create', body));
    }

    getDiary(id){
        return(this.instance.get(`/${id}`));
    }

    deleteDiary(id) {
        return(this.instance.delete(`/${id}`))
    }
}
