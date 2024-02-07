
import { api } from "./configs/axiosConfigs"
import { defineCancelApiObject } from "./configs/axiosUtils"

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
    await api.request({
      url: `/tasks`,
      method: "POST",
      data: Tasks,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })
  }
}

// defining the cancel API object for TaskAPI
const cancelApiObject = defineCancelApiObject(TaskAPI)