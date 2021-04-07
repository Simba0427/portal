import http from "../utility/AxiosInstance";

const userToken = localStorage.getItem("userToken");
const accessToken = localStorage.getItem("accessToken");

class MembershipsDataService {
  getAll(data) {
    const payload = {
      accessToken: accessToken,
      data: data
    }
    return http.post("/officernd/memberships", payload,
    {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }
  getPlans() {
    const payload = {
      accessToken: accessToken,
    }
    return http.post("/officernd/plans", payload,
    {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }
  getAccounts() {
    const payload = {
      accessToken: accessToken,
    }
    return http.post("/officernd/accounts", payload,
    {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }
  getPlanTypes() {
    const payload = {
      accessToken: accessToken,
    }
    return http.post("/officernd/planTypes", payload,
    {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }
}

export default new MembershipsDataService();