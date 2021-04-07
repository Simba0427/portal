import http from "../utility/AxiosInstance";

const userToken = localStorage.getItem("userToken");
const accessToken = localStorage.getItem("accessToken");

class OfficesDataService {
  getAll(data) {
    const payload = {
      accessToken: accessToken,
      data
    }
    return http.post("/officernd/billing/invoices", payload,
    {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }
}

export default new OfficesDataService();