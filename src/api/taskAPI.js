
import { api } from "./configs/axiosConfigs"
import { defineCancelApiObject } from "./configs/axiosUtils"

import { CookiesProvider, useCookies } from "react-cookie";

export const TaskAPI = {
  create: async function (Task, cancel = false) {
    await api.request({
      url: `/task`,
      method: "POST",
      data: Task,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })
  },
  createMany: async function (Tasks, cancel = false) {
    try {
      const { data: response } = await api.request({
        url: `/tasks`,
        method: "POST",
        data: { tasks: Tasks },
        signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
      })
      return response;
    } catch (error) {
      console.error(error)
    }
  }
}

// defining the cancel API object for TaskAPI
const cancelApiObject = defineCancelApiObject(TaskAPI)