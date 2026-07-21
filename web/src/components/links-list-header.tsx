import { Button } from "./ui/button";
import { DownloadSimpleIcon } from "@phosphor-icons/react";

export function LinksListHeader() {
  return(
    <div className="w-full flex items-center justify-between">
      <span className="text-lg font-bold text-gray-600">Meus links</span>
        <Button variant="secondary" className="h-8 rounded-sm" >
          <DownloadSimpleIcon strokeWidth={1.5} className="size-4"/>
          <span className="text-sm">Baixar CSV</span>
        </Button>
    </div>
  )
}