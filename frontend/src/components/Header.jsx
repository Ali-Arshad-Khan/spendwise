import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import spendWiseLogo from "../assets/images/icons/logo.png";
import star from "../assets/images/icons/star1.png";
import hamburgerIcon from "../assets/images/icons/hamburger.png";
import closeIcon from "../assets/images/icons/close.png";

export default function Header() {
  const [scroll, setScroll] = useState(0);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScroll(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();

  // Reset progress bar on navigation
  useEffect(() => {
    setScroll(0);
  }, [location.pathname]);

  // Reset page scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <div className="header fixed left-4 right-4 top-6 sm:top-10 sm:left-10  sm:right-10 bg-white/4 backdrop-blur-md text-white z-50 flex justify-between items-center pl-3 pr-3 sm:pl-10 sm:pr-10 h-16 rounded-t-sm">
        <Link to="/">
          <div className="flex justify-center items-center gap-1.5">
            <img
              className="w-35 sm:w-40 transition-transform duration-200 hover:scale-110 cursor-pointer"
              src={spendWiseLogo}
              alt="spendWiseLogo"
            />
          </div>
        </Link>
        <div onClick={() => setSidebar(!sidebar)} className="sm:hidden">
          <img
            className="w-8"
            src={sidebar ? closeIcon : hamburgerIcon}
            alt="hamburgerIcon"
          />
        </div>
        <ul className="items-center justify-center gap-0 hidden sm:flex">
          <div className="gap-0 sm:gap-2 flex justify-center items-center">
            <Link to="/docs">
              <button className="py-1.5 px-2.5 rounded-sm cursor-pointer hover:text-gray-300 transition-all duration-300">
                Documentation
              </button>
            </Link>
            <a href="https://github.com/Ali-Arshad-Khan/spendwise">
            <button className="flex justify-center items-center gap-2 py-1.5 px-2.5 rounded-sm cursor-pointer hover:text-gray-300 transition-all duration-300">
              <img className="hidden sm:block w-5" src={star} alt="" />
              <p>Github Star</p>
            </button>
            </a>
            <Link to="/dashboard">
              <button className="ml-2 shadow-[inset_0px_3px_2px_-2px_rgba(255,255,255,1)] py-1.5 px-2.5 rounded-sm bg-primary cursor-pointer hover:text-black hover:bg-white transition-all duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </ul>
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10 rounded-b-xl overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${scroll}%` }}
          ></div>
        </div>
      </div>
      {sidebar ? (
        <div className="fixed right-4 top-25 text-white rounded-sm bg-white/4 backdrop-blur-md z-100">
          <div className="gap-2 flex flex-col justify-start items-start pt-2 pb-4 px-2">
            <Link to="/docs">
              <button className="py-1.5 px-2.5 rounded-sm cursor-pointer hover:text-gray-300 transition-all duration-300">
                Documentation
              </button>
            </Link>
            <a href="https://github.com/Ali-Arshad-Khan/spendwise">
              <button className="flex justify-center items-center gap-2 py-1.5 px-2.5 rounded-sm cursor-pointer hover:text-gray-300 transition-all duration-300">
                <img className="w-5" src={star} alt="" />
                <p>Github Star</p>
              </button>
            </a>
            <Link to="/dashboard">
              <button className="mt-2 ml-2 shadow-[inset_0px_3px_2px_-2px_rgba(255,255,255,1)] py-1.5 px-2.5 rounded-sm bg-primary cursor-pointer hover:text-black hover:bg-white transition-all duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
