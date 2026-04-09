import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7094/api', // Adjust if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
