import axios from "axios";

const instance = axios.create({
    baseURL: "https://my-burger-40fec-default-rtdb.firebaseio.com/",
});

export default instance;
