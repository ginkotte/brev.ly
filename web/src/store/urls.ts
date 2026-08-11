import { enableMapSet } from "immer"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { createShortUrl } from "../http/create-short-url"
import { deleteShortUrl } from "../http/delete-short-url"

export type Url = {
  originalUrl: string
  alias: string
  totalAccess: number
}

type UrlState = {
  urls: Map<string, Url>
  createUrl: (originalUrl: string, alias: string) => Promise<void>
  deleteUrl: (urlId: string) => Promise<void>
}

enableMapSet()

export const useUrls = create<UrlState>()(
  immer((set) => {
    async function createUrl(originalUrl: string, alias: string) {
      if (!originalUrl.trim() || !alias.trim()) {
        return
      }

      try {
        const url = await createShortUrl({
          originalUrl,
          alias,
        })

        set((state) => {
          state.urls.set(url.id, {
            originalUrl: originalUrl,
            alias: alias,
            totalAccess: 0,
          })
        })
      } catch (error) {
        console.error("Erro ao criar URL:", error)
      }
    }

    async function deleteUrl(urlId: string) {
      try {
        await deleteShortUrl({ urlId })

        set((state) => {
          state.urls.delete(urlId)
        })
      } catch (error) {
        console.error("Erro ao deletar URL:", error)
      }
    }

    return {
      urls: new Map(),
      createUrl,
      deleteUrl,
    }
  }),
)