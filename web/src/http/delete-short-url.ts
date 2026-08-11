import axios from "axios"

interface DeleteShortUrlParams {
  urlId: string
}

export async function deleteShortUrl({ urlId }: DeleteShortUrlParams) {
  console.log(`deleting url ${urlId}`)
  return await axios.delete('http://localhost:3333/url', {
    params: {
      id: urlId,
    },
  })
}