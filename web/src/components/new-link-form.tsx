import { useState } from "react";
import { useUrls } from "../store/urls";
import { Button } from "./ui/button";

export function NewLinkForm() {
  const createUrl = useUrls(store => store.createUrl)

  const [originalUrl, setOriginalUrl] = useState("")
  const [alias, setAlias] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    createUrl(originalUrl, alias)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <label
          htmlFor="original-url"
          className="text-xs font-medium uppercase text-gray-500"
        >
          Link original
        </label>

        <input
          id="original-url"
          type="url"
          required
          placeholder="www.exemplo.com.br"
          value={originalUrl}
          onChange={event => setOriginalUrl(event.target.value)}
          className="
            h-12
            rounded-lg
            border
            border-gray-300
            px-4
            text-sm
            outline-none
            transition-colors
            placeholder:text-gray-400
            focus:border-blue-base
          "
        />
      </div>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="short-url"
          className="text-xs font-medium uppercase text-gray-500"
        >
          Link encurtado
        </label>

        <div className="flex h-12 items-center rounded-lg border border-gray-300 px-4 focus-within:border-blue-500">
          <span className="text-sm text-gray-500">brev.ly/</span>

          <input
            id="short-url"
            type="text"
            required
            value={alias}
            onChange={event => setAlias(event.target.value)}
            className="ml-1 flex-1 bg-transparent text-sm outline-none"
            placeholder="meu-link"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button type="submit">
          Salvar link
        </Button>
      </div>
    </form>
  )
}
