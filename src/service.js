import httpService from "./httpService";
const obj = {
    doOperation(body) {
        const url = "myurl:params(type:'decrement') which decrement return sucess or false";
        console.log("operation body",body);
        return httpService.post(url,body);
    }
};

export default obj;
