import { LinkIcon } from "@phosphor-icons/react";

export function LinksListEmpty() {
  return(
    <div className="flex flex-col gap-3 items-center justify-between">
      <LinkIcon strokeWidth={1.5} color="gray" className="size-8"/>
      <span className="text-xs text-gray-500 uppercase">ainda não existem links cadastrados</span>
    </div>
  )
}