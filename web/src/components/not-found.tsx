import { Link } from "react-router-dom";
import notFound from "../assets/not-found.svg";

export function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="flex w-full flex-col items-center rounded-xl bg-gray-100 px-6 py-20">
        <img
          src={notFound}
          alt="brev.ly"
          className="mb-9 h-20"
        />

        <h1 className="text-xl font-bold text-gray-600">
          Link não encontrado
        </h1>

        <div className="mt-7 text-center text-base font-medium text-gray-600">
          <p>
            O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em {" "}
            <Link
              to={`/`}
              className="text-md font-semibold text-blue-base"
            >
              brev.ly
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}