import http from "../utility/AxiosInstance";

const userToken = localStorage.getItem("userToken");
const accessToken = localStorage.getItem("accessToken");

class RevenueDataService {
  getLeads(data) {
    const payload = {
      accessToken: accessToken,
      data: data,
    }
    return http.post("/officernd/leads", payload,
    {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }
  getRevenueDetails(reportId) {
    const payload = {
      accessToken: accessToken,
      reportId: reportId,
    }
    return http.post("/officernd/report/revenue/details", payload,
    {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }
  getRevenueRows(reportId) {
    const payload = {
      accessToken: accessToken,
      reportId: reportId,
    }
    return http.post("/officernd/report/revenue/rows", payload,
    {
      headers: {
          Authorization: "Bearer " + userToken
      }, 
    });
  }
}

export default new RevenueDataService();