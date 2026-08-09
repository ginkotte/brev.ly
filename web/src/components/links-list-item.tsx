import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";

export function LinksListItem() {
  return (
    <div className="flex items-center gap-6 py-4">
      {/* Informações */}
      <div className="flex-1 min-w-0">
        <p className="text-md font-semibold text-blue-base">
          brev.ly/Portfolio-Dev
        </p>

        <p className="truncate text-sm text-gray-500">
          devsite.portfolio.com.br/devname-123456
        </p>
      </div>

      {/* Acessos */}
      <span className="w-24 text-right text-sm text-gray-500">
        30 acessos
      </span>

      {/* Botões */}
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-sm"
        >
          <CopyIcon className="size-4" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-sm"
        >
          <TrashIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}