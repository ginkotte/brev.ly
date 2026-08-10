import { enableMapSet } from "immer"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { createShortUrl } from "../http/create-short-url"

export type Url = {
  originalUrl: string,
  alias: string,
  totalAccess: number
}

type UrlState = {
  urls: Map<string, Url>
  createUrl: (originalUrl: string, alias: string) => void
}

enableMapSet()

export const useUrls = create<UrlState, [['zustand/immer', never]]>(immer((set, get) => {
  async function processUrl(urlId: string) {
    const url = get().urls.get(urlId)

    if (!url) {
      return
    }

    await createShortUrl({
      alias: url.alias,
      originalUrl: url.originalUrl
    })
  }

  function createUrl(originalUrl: string, alias: string) {
    const urlId = crypto.randomUUID()

    const url = {
      originalUrl,
      alias,
      totalAccess: 0
    }

    set(state => {
      state.urls.set(urlId, url)
    })

    processUrl(urlId)
  }

  return {
    urls: new Map(),
    createUrl
  }
}))