import http from "../utility/AxiosInstance";

const userToken = localStorage.getItem("userToken");

class ReportsDataService {
  getAll(data) {
    const payload = {
      data: data
    }
    return http.post("/reports", payload, {
        headers: {
            Authorization: "Bearer " + userToken
        }, 
    });
  }

  get(id) {
    return http.get(`/reports/${id}`, {
        headers: {
            Authorization: "Bearer " + userToken
        }, 
    });
  }

  create(data) {
    return http.post("/reports/create", data, {
        headers: {
            Authorization: "Bearer " + userToken
        }, 
    });
  }

  update(data) {
    return http.post(`/reports/update`, data, {
        headers: {
            Authorization: "Bearer " + userToken
        }, 
    });
  }

  delete(id) {
    return http.post(`/reports/delete`, id, {
        headers: {
            Authorization: "Bearer " + userToken
        }, 
    });
  }

  uploadFile(data) {
    return http.post(`/reports/uploadFile`, data, {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }

  downloadFile(data) {
    fetch(data.file_path)
    .then(response => {
        response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = data.file_name;
            a.click();
        });
        //window.location.href = response.url;
    });
  }
}

export default new ReportsDataService();