import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { useUrls, type Url } from "../store/urls";
import { Link } from "react-router-dom";

interface LinksListItemProps {
  urlId: string,
  url: Url
}

export function LinksListItem({urlId, url}: LinksListItemProps) {
  const deleteUrl = useUrls((store) => store.deleteUrl)

  return (
    <div className="flex items-center gap-6 py-4">
      <div className="flex-1 min-w-0">
        <Link
          to={`/${urlId}`}
          className="text-md font-semibold text-blue-base"
        >
          brev.ly/{url.alias}
        </Link>

        <p className="truncate text-sm text-gray-500">
          {url.originalUrl}
        </p>
      </div>

      <span className="w-24 text-right text-sm text-gray-500">
        {url.totalAccess} acessos
      </span>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-sm"
          onClick={() => navigator.clipboard.writeText(`http://localhost:3333/url?id=${urlId}`)}
        >
          <CopyIcon className="size-4" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-sm"
          onClick={() => deleteUrl(urlId)}
        >
          <TrashIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}