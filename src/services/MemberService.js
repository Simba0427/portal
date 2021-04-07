import http from "../utility/AxiosInstance";

const userToken = localStorage.getItem("userToken");
const accessToken = localStorage.getItem("accessToken");

class MembersDataService {
  getAll(data) {
    const payload = {
      accessToken: accessToken,
      data: data
    }
    return http.post("/officernd/members", payload,
    {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }

  create(data) {
    const payload = {
      data: data, 
      accessToken: accessToken
    }
    return http.post("/officernd/members/create", payload, {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }

  update(data) {
    const payload = {
      data: data, 
      accessToken: accessToken
    }
    return http.post(`/officernd/members/update`, payload, {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }

  delete(idArray) {
    const payload = {
      idArray: idArray, 
      accessToken: accessToken
    }
    console.log(payload)
    return http.post(`/officernd/members/delete`, payload, {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }

}

export default new MembersDataService();