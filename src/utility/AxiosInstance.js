const axios = require('axios').default;

export const API_HOST = "http://localhost:3500";

export default axios.create({
    baseURL: API_HOST,
    headers: {
      "Content-type": "application/json",
    },
    timeout: 100000,
});  