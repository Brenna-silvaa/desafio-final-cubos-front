import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthProvider";
import { GlobalProvider } from "./contexts/GlobalProvider";
import { useAuth } from "./hooks/useAuth";
import Cadastro1 from "./pages/Cadastro-1";
import Cadastro2 from "./pages/Cadastro-2";
import Cadastro3 from "./pages/Cadastro-3";
import Clientes from "./pages/Clientes";
import Cobrancas from "./pages/Cobrancas";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  function ProtecaoAuth() {
    const { token } = useAuth();
    return token ? <Outlet /> : <Navigate to="/login" />;
  }
  function ProtecaoCadastro2() {
    const { novoUsuario } = useAuth();
    return novoUsuario.email ? <Outlet /> : <Navigate to="/cadastro-1" />;
  }
  function ProtecaoCadastro3() {
    const { novoUsuario } = useAuth();
    return novoUsuario.senha ? <Outlet /> : <Navigate to="/cadastro-1" />;
  }

  function RedirectHome() {
    const { path } = useParams();
    return path === "dashboard" || path === "home" ? (
      <Navigate to="/" />
    ) : (
      <Navigate to="*" />
    );
  }

  return (
    <div className="App">
      <AuthProvider>
        <GlobalProvider>
          <Router>
            <Routes>

              <Route path="/login" element={<Login />} />
              <Route path="/cadastro-1" element={<Cadastro1 />} />

              <Route element={<ProtecaoCadastro2 />}>
                <Route path="/cadastro-2" element={<Cadastro2 />} />
              </Route>

              <Route element={<ProtecaoCadastro3 />}>
                <Route path="/cadastro-3" element={<Cadastro3 />} />
              </Route>

              <Route element={<ProtecaoAuth />}>
                <Route path="/" element={<Home />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/clientes/:user_id" element={<Clientes />} />
                <Route path="/cobrancas" element={<Cobrancas />} />
                <Route path="/:path" element={<RedirectHome />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </GlobalProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
