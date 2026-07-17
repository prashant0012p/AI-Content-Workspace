import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import Drafts from "./pages/Drafts";
import Preferences from "./pages/Preferences";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/drafts" element={<Drafts />} />
        <Route path="/preferences" element={<Preferences />} />
      </Route>
    </Routes>
  );
}

export default App;