import logo from "./assets/logo.svg";
import { NewLink } from "./components/new-link";

export function App() {
  return (
    <main className="min-h-dvh bg-gray-200 flex items-center justify-center px-6">
      <div className="w-full max-w-5xl">
        <img
          src={logo}
          alt="brev.ly"
          className="mb-8 h-8"
        />

        <div className="flex gap-6">
          <NewLink />

          {/* Futuramente */}
          {/* <LinksList /> */}
        </div>
      </div>
    </main>
  );
}