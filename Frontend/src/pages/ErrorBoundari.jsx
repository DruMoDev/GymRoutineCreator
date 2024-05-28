import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorBoundary = () => {
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Simular un error ficticio aquí, por ejemplo:
    // throw new Error("Error 404: Page not found");

    // Simulación de redirección después de 2 segundos
    const redirectTimeout = setTimeout(() => {
      setRedirecting(true);
      navigate("/");
    }, 2000);

    // Limpiar el timeout si el componente se desmonta antes de redirigir
    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "red" }}>Error 404: Página no encontrada</h1>
      {redirecting && <p>Redirigiendo a la página de inicio...</p>}
    </div>
  );
};

export default ErrorBoundary;
