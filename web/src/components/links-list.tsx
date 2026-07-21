import { LinksListEmpty } from "./links-list-empty";
import { LinksListHeader } from "./links-list-header"

export function LinksList() {
  return (
    <div className="w-full max-w-[580px] h-full overflow-hidden rounded-xl bg-gray-100 p-6">
      <LinksListHeader />

      <div className="flex flex-col gap-6 py-5">
        <div className="h-px bg-gray-200 border-t border-gray-200/50 box-content"></div>
        <LinksListEmpty />
      </div>
      
    </div>
  );
}