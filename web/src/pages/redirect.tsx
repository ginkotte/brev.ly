import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RedirectComponent } from "../components/redirect";
import axios from "axios";

export function Redirect() {
  const { alias } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function redirect() {
      try {
        const response = await axios.get(
          `http://localhost:3333/url?id=${alias}`,
        );

        window.location.href = response.data.url;
      } catch {
        navigate("/not-found");
      }
    }

    redirect();
  }, [alias, navigate]);

  return (
    <main className="min-h-dvh bg-gray-200 flex items-center justify-center">
      <div className="w-full max-w-[580px]">
        <RedirectComponent />
      </div>
    </main>
  );
}