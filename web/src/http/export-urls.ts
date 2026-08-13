import axios from "axios"

export async function exportUrls() {
  const response = await axios.post("http://localhost:3333/urls/exports");

  return response.data.reportUrl;
}