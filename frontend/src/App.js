import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import LandingPage from "@/landing/LandingPage";
import AuthCallback from "@/auth/AuthCallback";
import ProtectedRoute from "@/auth/ProtectedRoute";
import CourseLayout from "@/course/CourseLayout";
import Dashboard from "@/course/pages/Dashboard";
import ModulesPage from "@/course/pages/ModulesPage";
import ModulePage from "@/course/pages/ModulePage";
import Flashcards from "@/course/pages/Flashcards";
import Simulado from "@/course/pages/Simulado";
import Gamificacao from "@/course/pages/Gamificacao";
import Ranking from "@/course/pages/Ranking";
import Certificado from "@/course/pages/Certificado";
import Configuracoes from "@/course/pages/Configuracoes";
import ProfessorWidget from "@/components/ProfessorWidget";

function AppRouter() {
  const location = useLocation();
  if (location.hash?.includes("session_id=")) {
    return <AuthCallback />;
  }
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/curso"
        element={
          <ProtectedRoute>
            <CourseLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="modulos" element={<ModulesPage />} />
        <Route path="modulo/:id" element={<ModulePage />} />
        <Route path="flashcards" element={<Flashcards />} />
        <Route path="simulado" element={<Simulado />} />
        <Route path="gamificacao" element={<Gamificacao />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="certificado" element={<Certificado />} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <MotionConfig reducedMotion="user">
            <AppRouter />
            <ProfessorWidget />
          </MotionConfig>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
