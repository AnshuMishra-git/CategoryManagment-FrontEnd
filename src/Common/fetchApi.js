import axios from 'axios';
const url = process.env.REACT_APP_SERVER_URL;

const fetchApi = async (serviceType) => {
  if (serviceType.method === 'get') {
    return axios
      .get(`${url}${serviceType.param}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }
  if (serviceType.method === 'post') {
    return axios
      .post(`${url}${serviceType.reqUrl}`, serviceType.data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          return err.response;
        } else {
          return err.response;
        }
      });
  }
  if (serviceType.method === 'put') {
    return axios
      .put(`${url}${serviceType.reqUrl}`, serviceType.data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          return err.response;
        } else {
          return err.response;
        }
      });
  }
  if (serviceType.method === 'delete') {
    return axios
      .delete(`${url}${serviceType.reqUrl}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          return err.response;
        } else {
          return err.response;
        }
      });
  }
};
export default fetchApi;
