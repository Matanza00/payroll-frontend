import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/logo.svg';
import nxc from '../../images2/nxc.png';
import nxcwhite from '../../images2/nxcwhite.png';
import { GoOrganization } from 'react-icons/go';
import { HiUserGroup } from 'react-icons/hi2';
import { MdOutlineDashboard, MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthState } from '../../store/authSlice';
import { GiSlashedShield } from 'react-icons/gi';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { TbSettingsExclamation, TbSubtask } from 'react-icons/tb';
import { AiFillCar } from 'react-icons/ai';
import { RiBusWifiFill } from 'react-icons/ri';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { GiAutoRepair } from 'react-icons/gi';
import { CiLogout } from 'react-icons/ci';
import { FiUser } from 'react-icons/fi';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { IoIosWarning } from 'react-icons/io';

const links = [
  // {
  //   id: 'user',
  //   path: '/users',
  //   icon: <HiUserGroup className="w-5 h-5" />,
  //   text: 'Users',
  //   styleChecker: 'users',
  // },
  // {
  //   id: 'role',
  //   path: '/roles',
  //   icon: <TbSubtask className="w-5 h-5" />,
  //   text: 'Roles',
  //   styleChecker: 'roles',
  // },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [filteredLinks, setFilteredLinks] = useState([]);
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const permissions = user.Role.rolePermissions.map((e) => e?.module?.name);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );
  let adminRole =
    user.Role.roleName == 'companyAdmin' || user.Role.roleName == 'superAdmin';

  let superRole =
    user.Role.roleName == 'superAdmin' || user.Role.roleName == 'companyAdmin';
  let ManagerRole =
    user.Role.roleName == 'Manager' && user.Role.roleName == 'superAdmin';

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    dispatch(resetAuthState());
    navigate('/');
  };

  useEffect(() => {
    let allLinks = links?.filter((link) => permissions.includes(link.id));
    {
      superRole &&
        allLinks.push({
          id: 'role',
          path: '/roles',
          icon: <TbSubtask className="w-5 h-5" />,
          text: 'Roles',
          styleChecker: 'roles',
        });
    }

    allLinks.push({
      id: 'user',
      path: '/users',
      icon: <HiUserGroup className="w-5 h-5" />,
      text: 'Users',
      styleChecker: 'users',
    });
    allLinks.push({
      id: 'payroll',
      path: '/payroll',
      icon: <HiUserGroup className="w-5 h-5" />,
      text: 'Payroll',
      styleChecker: 'payroll',
    });
    allLinks.push({
      id: 'benefits',
      path: '/benefits',
      icon: <HiUserGroup className="w-5 h-5" />,
      text: 'Benefits',
      styleChecker: 'benefits',
    });
    allLinks.push({
      id: 'expenses',
      path: '/expenses',
      icon: <HiUserGroup className="w-5 h-5" />,
      text: 'Expenses',
      styleChecker: 'expenses',
    });
    allLinks.push({
      id: 'payslip',
      path: '/payslip',
      icon: <HiUserGroup className="w-5 h-5" />,
      text: 'Payslip',
      styleChecker: 'payslip',
    });
    allLinks.push({
      id: 'deposits',
      path: '/deposits',
      icon: <HiUserGroup className="w-5 h-5" />,
      text: 'Deposits',
      styleChecker: 'deposits',
    });
    allLinks.push({
      id: 'attendance',
      path: '/attendance',
      icon: <HiUserGroup className="w-5 h-5" />,
      text: 'Attendance',
      styleChecker: 'attendance',
    });
    allLinks.push({
      id: 'tax-management',
      path: '/tax-management',
      icon: <HiUserGroup className="w-5 h-5" />,
      text: 'Tax-management',
      styleChecker: 'tax-management',
    });

    setFilteredLinks(allLinks);
    return () => {};
  }, []);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink
          to="/"
          className="text-white font-black text-4xl tracking-widest flex w-full gap-2 items-center"
        >
          <img src={Logo} alt="SOS Logo" className="w-22 h-24" /> PayRoll
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-white"
        >
          X
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('dashboard') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <MdOutlineDashboard className="w-5 h-5" /> Dashboard
                </NavLink>
              </li>
              {filteredLinks?.map((e, i) => (
                <li key={e.id}>
                  <NavLink
                    to={e.path}
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes(e.styleChecker) &&
                      'bg-graydark dark:bg-meta-4'
                    }`}
                  >
                    {e.icon} {e.text}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div
              className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 hover:cursor-pointer"
              onClick={logoutHandler}
            >
              <CiLogout className="w-6 h-6" /> Logout
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
