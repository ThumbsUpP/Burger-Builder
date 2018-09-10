import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-shack-5fef2.firebaseio.com/"
});

export default instance;