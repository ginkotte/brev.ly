import axios from "axios"

interface CreateShortUrlParams {
  alias: string,
  originalUrl: string
}

export async function createShortUrl({ alias, originalUrl }: CreateShortUrlParams) {
  const data = {
    alias,
    originalUrl
  }

  const response = await axios.post<{ url: string, id: string }>('http://localhost:3333/url', data)

  return { url: response.data.url, id: response.data.id }
}