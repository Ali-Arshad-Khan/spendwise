import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthRequired from "./components/AuthRequired";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import DashboardLayout from "./components/DashboardLayout";
import { DashboardProvider } from "./components/DashboardProvider";
import AiBeta from "./pages/AiBeta";
import Experiment from "./pages/Experiment";
import Docs from "./pages/Docs";
import Page404 from "./pages/Page404";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="docs" element={<Docs />} />

        {/* Protected Dashboard Routes */}
        <Route element={<AuthRequired />}>
          <Route
            path="dashboard"
            element={
              <DashboardProvider>
                <DashboardLayout />
              </DashboardProvider>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="expense" element={<Expense />} />
            <Route path="income" element={<Income />} />
            <Route path="ai" element={<AiBeta />} />
            <Route path="experiment" element={<Experiment />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
