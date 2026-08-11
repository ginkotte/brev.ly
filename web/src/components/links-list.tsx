import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useUrls } from "../store/urls";
import { LinksListHeader } from "./links-list-header";
import { LinksListItem } from "./links-list-item";
import { LinksListEmpty } from "./links-list-empty";

export function LinksList() {
  const urls = useUrls(store => store.urls);
  const isUrlsListEmpty = urls.size === 0;

  return (
    <div className="w-full flex-1 rounded-xl bg-gray-100 p-6">
      <LinksListHeader />

      <div className="mt-5 border-t border-gray-200 pt-5">
        <ScrollArea.Root type="hover" className="w-full">
          <ScrollArea.Viewport className="max-h-[400px] w-full pr-3">
            {isUrlsListEmpty ? (
              <LinksListEmpty />
            ) : (
              <div className="flex flex-col divide-y divide-gray-200">
                {Array.from(urls.entries()).map(([urlId, url]) => (
                  <LinksListItem
                    key={urlId}
                    url={url}
                    urlId={urlId}
                  />
                ))}
              </div>
            )}
          </ScrollArea.Viewport>

          <ScrollArea.Scrollbar
            orientation="vertical"
            className="
              flex
              w-2
              touch-none
              select-none
              p-0.5
            "
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-full bg-blue-base" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </div>
  );
}