import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from './components/RootLayout';
import { LeadsRoot } from './pages/leads';
import AllLeadsPage from './pages/leads/all';
import NewLeadPage from './pages/leads/new';
import { UsersRoot } from './pages/users';
import CreateUserForm from './pages/users/new';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="leads" element={<LeadsRoot />}>
            <Route path="all" element={<AllLeadsPage />} />
            <Route path="new" element={<NewLeadPage />} />
          </Route>
          <Route path="users" element={<UsersRoot />}>
            <Route path="new" element={<CreateUserForm />} />
          </Route>
          <Route path="*" element={<div className="p-8">Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
