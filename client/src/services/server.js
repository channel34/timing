import axios from "axios";

export function addSchedule(payload) {
  return axios.post("api/letsgo/uploadSchedule", payload);
}

export function search(pageIndex, pageSize, q) {
  return axios.get(
    "api/letsgo/search/" +
      pageIndex +
      "/" +
      pageSize +
      "?q=" +
      encodeURIComponent(q)
  );
}

export function getById(id) {
  return axios.get("api/letsgo/event/" + id);
}

export function updateEvent(payload, id) {
  return axios.put("api/letsgo/update" + id, payload);
}

export function deleteEvent(id) {
  return axios.delete("api/delete/" + id);
}
