import http from "../utility/AxiosInstance";

const userToken = localStorage.getItem("userToken");
const accessToken = localStorage.getItem("accessToken");

class OfficesDataService {
  getAllOffices() {
    const payload = {
      accessToken: accessToken
    }
    return http.post("/officernd/offices", payload,
    {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }

  getAllTeams(data) {
    const payload = {
      accessToken: accessToken,
      data: data
    }
    return http.post("/officernd/offices/teams", payload,
    {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }

  get(id) {
    const payload = {
      id: id,
      accessToken: accessToken
    }
    return http.post(`/officernd/offices/getOfficeById`, payload,
    {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }
}

export default new OfficesDataService();