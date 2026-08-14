import { Link } from "react-router-dom";
import logo from "../assets/logo-icon.svg";

export function RedirectComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="flex w-full flex-col items-center rounded-xl bg-gray-100 px-6 py-20">
        <img
          src={logo}
          alt="brev.ly"
          className="mb-9 h-12"
        />

        <h1 className="text-xl font-bold text-gray-600">
          Redirecionando...
        </h1>

        <div className="mt-7 text-center text-base font-medium text-gray-600">
          <p>
            O link será aberto automaticamente em alguns instantes.
          </p>

          <p>
            Não foi redirecionado?{" "}
            <Link
              to={`/`}
              className="text-md font-semibold text-blue-base"
            >
              Acesse aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}