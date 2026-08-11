import axios from "axios"

interface Url {
  id: string,
  originalUrl: string,
  shortUrl: string,
  totalAccess: number
}

interface ApiUrl {
  total: number,
  urls: Url[]
}

export async function getUrls() {
  const response = await axios.get<ApiUrl>("http://localhost:3333/urls")

  return response.data
}