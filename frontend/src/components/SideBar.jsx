import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "./AuthProvider";
import { DashboardContext } from "./DashboardProvider";
import spendWiseLogo from "../assets/images/icons/logo.png";
import userAvatar from "../assets/images/user.png";
import { useState } from "react";
import hamburgerIcon from "../assets/images/icons/hamburger.png";
import closeIcon2 from "../assets/images/icons/close.png";

export function DesktopSideBar() {
  const { user, logout } = useAuth();
  const { flag } = useContext(DashboardContext);

  const activeLink = "text-primary font-bold underline underline-offset-4";
  const nonActiveLink =
    "text-gray-300 hover:underline hover:underline-offset-4";

  return (
    <>
      {/*Destop Sidebar  */}
      <div
        className={`side-bar hidden fixed left-0 bottom-0 top-0 w-full max-w-[280px] sm:max-w-[280px] text-white p-[30px] lg:flex flex-col justify-between ${
          flag ? "bg-white/4 backdrop-blur-md" : "bg-cardbg"
        }`}
      >
        <div>
          <div className="title flex justify-center items-center gap-[100px]">
            <Link to="/">
              <div className="title-left text-[clamp(16px,2.5vw,24px)]">
                <img
                  className="w-[160px] transition-transform duration-200 hover:scale-110 cursor-pointer"
                  src={spendWiseLogo}
                  alt="spendWiseLogo"
                />
              </div>
            </Link>
            <button className="sidebar-close"></button>
          </div>
          <div className="nav mt-5 px-5 py-2.5 gap-[30px] flex flex-col justify-items-start items-start">
            <ul className="flex flex-col gap-[15px]">
              <NavLink
                to="."
                className={({ isActive }) =>
                  isActive ? activeLink : nonActiveLink
                }
                end
              >
                Dashboard
              </NavLink>

              <NavLink
                to="expense"
                className={({ isActive }) =>
                  isActive ? activeLink : nonActiveLink
                }
              >
                Expense
              </NavLink>

              <NavLink
                to="income"
                className={({ isActive }) =>
                  isActive ? activeLink : nonActiveLink
                }
              >
                Income
              </NavLink>
              {/* <li>AI Beta</li> */}
              <NavLink
                to="ai"
                className={({ isActive }) =>
                  isActive ? activeLink : nonActiveLink
                }
              >
                AI Beta
              </NavLink>

              <NavLink
                to="experiment"
                className={({ isActive }) =>
                  isActive ? activeLink : nonActiveLink
                }
              >
                Experiments Lab
              </NavLink>
            </ul>
            <button
              onClick={logout}
              className="logout text-black bg-white px-5 py-[7px] rounded-lg flex justify-center items-center cursor-pointer hover:bg-gray-600 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="paid-plans bg-primary p-5 rounded-lg">
          <p className="font-bold text-[16px]">Try Paid Plans</p>
          <p className="text-[14px] max-w-[180px] mt-[15px]">
            We’ll reveal our paid plans when the upcoming premium features are
            released.
          </p>
          <button
            type="disabled"
            className="paid-btn mt-2.5 border border-white text-white px-5 cursor-not-allowed py-[5px] rounded-lg"
          >
            Paid Plans
          </button>
        </div>
        <div className="user bg-white/4 backdrop-blur-md p-[15px] rounded-lg flex justify-center items-center gap-3">
          {user ? (
            <img className="w-7" src={userAvatar} alt="userAvatar" />
          ) : null}
          {user?.name || "Guest"}
        </div>
      </div>
    </>
  );
}

export function MobileSideBar() {
  const { user, logout } = useAuth();
  const { flag } = useContext(DashboardContext);

  const activeLink = "text-primary font-bold underline underline-offset-4";
  const nonActiveLink =
    "text-gray-300 hover:underline hover:underline-offset-4";

  const [ss, setSS] = useState(false);

  return (
    <>
      {/*Mobile Sidebar  */}
      <div className="absolute top-7 right-5 z-100 lg:hidden">
        <button onClick={() => setSS(!ss)} className="cursor-pointer">
          <img className="w-8" src={hamburgerIcon} alt="hamburgerIcon" />
        </button>
        {ss && (
          <div
            className={`side-bar transition-all duration-300 ease-out
             animate-squeezeIn flex fixed right-0 bottom-0 top-0 w-full max-w-[280px] sm:max-w-[280px] text-white p-[30px] flex-col justify-between ${
               flag ? "bg-white/4 backdrop-blur-md" : "bg-cardbg"
             }`}
          >
            <div>
              <div className="title flex justify-center items-center gap-[100px]">
                <Link to="/">
                  <div className="title-left text-[clamp(16px,2.5vw,24px)]">
                    <img
                      className="w-[160px] transition-transform duration-200 hover:scale-110 cursor-pointer"
                      src={spendWiseLogo}
                      alt="spendWiseLogo"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => setSS(!ss)}
                  className="sidebar-close hover:scale-120 cursor-pointer transition-all duration-100"
                >
                  <img className="w-8" src={closeIcon2} alt="closeIcon2" />
                </button>
              </div>
              <div className="nav mt-5 px-5 py-2.5 gap-[30px] flex flex-col justify-items-start items-start">
                <ul className="flex flex-col gap-[15px]">
                  <NavLink
                    to="."
                    className={({ isActive }) =>
                      isActive ? activeLink : nonActiveLink
                    }
                    end
                    onClick={() => setSS(false)}
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="expense"
                    className={({ isActive }) =>
                      isActive ? activeLink : nonActiveLink
                    }
                    onClick={() => setSS(false)}
                  >
                    Expense
                  </NavLink>

                  <NavLink
                    to="income"
                    className={({ isActive }) =>
                      isActive ? activeLink : nonActiveLink
                    }
                    onClick={() => setSS(false)}
                  >
                    Income
                  </NavLink>
                  {/* <li>AI Beta</li> */}
                  <NavLink
                    to="ai"
                    className={({ isActive }) =>
                      isActive ? activeLink : nonActiveLink
                    }
                    onClick={() => setSS(false)}
                  >
                    AI Beta
                  </NavLink>

                  <NavLink
                    to="experiment"
                    className={({ isActive }) =>
                      isActive ? activeLink : nonActiveLink
                    }
                    onClick={() => setSS(false)}
                  >
                    Experiments Lab
                  </NavLink>
                </ul>
                <button
                  onClick={logout}
                  className="logout text-black bg-white px-5 py-[5px] rounded-lg flex justify-center items-center cursor-pointer hover:bg-gray-600 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="user bg-white/4 backdrop-blur-md p-[15px] rounded-lg flex justify-center items-center gap-3">
              {user ? (
                <img className="w-7" src={userAvatar} alt="userAvatar" />
              ) : null}
              {user?.name || "Guest"}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
