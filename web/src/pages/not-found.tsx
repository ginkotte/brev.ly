import { NotFoundComponent } from "../components/not-found";

export function NotFound() {
  return (
    <main className="min-h-dvh bg-gray-200 flex items-center justify-center">
      <div className="w-full max-w-[580px]">
        <NotFoundComponent />
      </div>
    </main>
  );
}