import { NewLinkForm } from "./new-link-form";

export function NewLink() {
  return (
    <div className="w-full max-w-[380px] w-full  overflow-hidden rounded-xl bg-gray-100 p-6">
      <header className="mb-6 ">
        <span className="text-lg font-bold text-gray-600">Novo link</span>
      </header>

      <div className="">
        <NewLinkForm />
      </div>
    </div>
  );
}