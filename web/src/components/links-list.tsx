import { LinksListHeader } from "./links-list-header";
import { LinksListItem } from "./links-list-item";

export function LinksList() {
  return (
    <div className="w-full flex-1 rounded-xl bg-gray-100 p-6">
      <LinksListHeader />

      <div className="mt-5 border-t border-gray-200">
        <div className="divide-y divide-gray-200">
          <LinksListItem />
          <LinksListItem />
          <LinksListItem />
          <LinksListItem />
        </div>
      </div>
    </div>
  );
}