import _ from "lodash";
import { InstanceAxios } from "../axios";

class HttpRestService {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async get(route, configs) {
    return this.axiosInstance
      .get(route, configs)
      .then((data) => _.get(data, "data"))
      .catch((e) => console.log(e));
  }

  async post(route, payload, configs) {
    return this.axiosInstance
      .post(route, payload, configs)
      .then((data) => _.get(data, "data"))
      .catch((e) => console.log(e));
  }

  async patch(route, payload, configs) {
    return this.axiosInstance
      .patch(route, payload, configs)
      .then((data) => _.get(data, "data"))
      .catch((e) => console.log(e));
  }

  async put(route, payload, configs) {
    return this.axiosInstance
      .put(route, payload, configs)
      .then((data) => _.get(data, "data"))
      .catch((e) => console.log(e));
  }

  async delete(route, configs) {
    return this.axiosInstance
      .delete(route, configs)
      .then((data) => _.get(data, "data"))
      .catch((e) => console.log(e));
  }
}

export const HttpService = new HttpRestService(InstanceAxios);
