import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerlover-48558-default-rtdb.firebaseio.com/'
});

export default instance;