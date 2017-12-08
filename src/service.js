import httpService from "./httpService";
const obj = {
    doOperation(body) {
        const url = "https://j5lm2nusvi.execute-api.us-east-1.amazonaws.com/dev/";
        return httpService.post(url,body);
    }
};

export default obj;
