import { useEffect, useState } from 'react';
import UploadWidget from './components/UploadWidget';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Companies from './pages/Companies';
import CompanyView from './pages/Companies/CompanyView';
import CompanyForm from './pages/Companies/CompanyForm';

import SetPassword from './pages/SetPassword/SetPassword';
import Roles from './pages/Roles';
import RoleUpdate from './pages/Roles/RoleUpdate';
import Users from './pages/Users/index';
import serAddForm from './pages/Users/UsersAddForm';
import UserUpdateForm from './pages/Users/UsersUpdateForm';
import UserView from './pages/Users/UsersView';
import UserAddForm from './pages/Users/UsersAddForm';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  let auth = useSelector((state) => state.auth);
  const PrivateRoutes = () => {
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" />;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* set-admin-password/b21bb23abc013133753ad2cb70016eaf816bd55dcfbaf113d03e49301e55efb3 */}
        <Route path="/set-admin-password/:token" element={<SetPassword />} />
        <Route path="/set-password/:token" element={<SetPassword />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route
          path="/"
          element={
            auth.isAuthenticated ? (
              <Navigate to="/dashboard" replace={true} />
            ) : (
              <Navigate to="/auth/signin" replace={true} />
            )
          }
        />
        {/* <Route element={<PrivateRoutes />}> */}
        <Route path="/dashboard" element={<ECommerce />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/roles/update" element={<RoleUpdate />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/view/:id" element={<CompanyView />} />
        <Route path="/companies/add" element={<CompanyForm />} />
        <Route path="/companies/update/:id" element={<CompanyForm />} />

        {/* CMS Path */}
        <Route path="/users" element={<Users />} />
        <Route path="/users/view/:id" element={<UserView />} />
        <Route path="/users/add" element={<UserAddForm />} />
        <Route path="/users/update/:id" element={<UserUpdateForm />} />

        {/*  <Route path="/cms_managers/update/:id" element={<ManagersUpdateForm />} />
        <Route path="/cms_managers/view/:id" element={<ManagerView />} />  */}

        {/* CMS Path */}
      </Routes>
    </>
  );
}

export default App;
