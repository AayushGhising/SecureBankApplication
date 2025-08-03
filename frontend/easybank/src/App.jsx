import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";

// Import all components
import Home from "./components/Home";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Notices from "./components/Notices";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import Account from "./components/Account";
import Balance from "./components/Balance";
import Loans from "./components/Loans";
import Cards from "./components/Cards";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NoPageFound from "./components/NoPageFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/notices" element={<Notices />} />

              <Route
                path="/dashboard"
                element={
                  // <ProtectedRoute>
                  <Dashboard />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  // <ProtectedRoute>
                  <Logout />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/myAccount"
                element={
                  // <ProtectedRoute>
                  <Account />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/myBalance"
                element={
                  <ProtectedRoute>
                    <Balance />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myLoans"
                element={
                  <ProtectedRoute>
                    <Loans />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myCards"
                element={
                  <ProtectedRoute>
                    <Cards />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NoPageFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
