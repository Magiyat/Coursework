import axios from "axios";

export default axios.create({
    baseURL: "http://51.250.79.250/",
    headers: {
        responseType: "json"
    }
});