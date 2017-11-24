import httpService from "./httpService";
const obj = {
    doOperation(body) {
        const url = "https://us-central1-firebase-musimobile.cloudfunctions.net/Count/";
        return httpService.post(url,body);
    }
};

export default obj;
