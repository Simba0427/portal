import http from "../utility/AxiosInstance";

const userToken = localStorage.getItem("userToken");

class UsersDataService {
  getAll(data) {
    const payload = {
      data: data
    }
    return http.post("/users", payload, {
        headers: {
            Authorization: "Bearer " + userToken
        }, 
    });
  }

  get(id) {
    return http.get(`/users/${id}`, {
        headers: {
            Authorization: "Bearer " + userToken
        }, 
    });
  }

  create(data) {
    return http.post("/register", data, {
        headers: {
            Authorization: "Bearer " + userToken
        }, 
    });
  }

  update(data) {
    return http.post(`/users/update`, data, {
        headers: {
            Authorization: "Bearer " + userToken
        }, 
    });
  }

  resetPassword(data) {
    return http.post(`/users/reset-password`, data, {
      headers: {
        Authorization: "Bearer " + userToken
      }, 
    })
  }

  delete(id) {
    return http.post(`/users/delete`, id, {
        headers: {
            Authorization: "Bearer " + userToken
        }, 
    });
  }

  inviteMember(data) {
    return http.post(`users/email-send`, data, {
      headers: {
        Authorization: "Bearer " + userToken,
        accept: 'application/json', 
        'content-type': 'application/json'
      },
    });
  }

}

export default new UsersDataService();