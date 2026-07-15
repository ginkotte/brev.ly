export function NewLinkForm() {
  return(
    <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <label htmlFor="original-url" className="text-xs font-medium uppercase text-gray-500">
            Link original
          </label>

          <input
            id="original-url"
            type="url"
            placeholder="www.exemplo.com.br"
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
          <label htmlFor="short-url" className="text-xs font-medium uppercase text-gray-500">
            Link encurtado
          </label>

          <div className="flex h-12 items-center rounded-lg border border-gray-300 px-4 focus-within:border-blue-500">
            <span className="text-sm text-gray-500">brev.ly/</span>

            <input
              id="short-url"
              type="text"
              className="ml-1 flex-1 bg-transparent text-sm outline-none"
              placeholder="meu-link"
            />
          </div>
        </div>
    </div>
  )
}