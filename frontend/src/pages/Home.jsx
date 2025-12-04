import { Link } from "react-router-dom";
import dashboardPage from "../assets/images/dashboardpage.png";
import incomePage from "../assets/images/incomepage.png";
import expensePage from "../assets/images/expensepage.png";
import aiPage from "../assets/images/aipage.png";
import dashboardIcon from "../assets/images/icons/dashboardicon1.png";
import incomeIcon from "../assets/images/icons/incomeicon1.png";
import expenseIcon from "../assets/images/icons/expenseicon1.png";
import aiIcon from "../assets/images/icons/aiicon1.png";
import exportIcon from "../assets/images/icons/exporticon1.png";
import labsIcon from "../assets/images/icons/labsicon1.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="main h-[100%] bg-gray-950">
        <Header />

        <div className="hero relative overflow-hidden pb-10 ">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_70%)] z-0"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_35%)] scale-250 z-0"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_20%)] scale-300 z-0"></div>

          <div className="hero-section relative z-10 flex justify-center items-center sm:items-center flex-col pt-40 pb-0 sm:pt-50 sm:pb-8 px-4">
            <span className="border border-white text-white px-4 py-2 text-[clamp(0.4rem,2vw,0.8rem)] rounded-4xl mb-2.5">
              AI-Powered
            </span>
            <h1 className="text-[clamp(2rem,5vw,3.75rem)] font-extrabold max-w-4xl text-center text-gray-100 md:px-20 lg:px-10">
              <span className=" text-expense">Expense</span> Tracker Made Simple
              That <span className="text-budget">Exceed</span> Expectations{" "}
            </h1>
            {/* <h1 className="text-[clamp(2rem,5vw,3.75rem)] font-extrabold max-w-4xl text-center text-gray-100">That <span className="text-budget">Exceed</span> Expectations</h1> */}
            <h2 className=" text-gray-200 mt-1.5 text-[clamp(1rem,3vw,2.5rem)] max-w-4xl text-center">
              Track Smarter. Spend Wiser.
            </h2>
            <Link to="dashboard" className="my-8 sm:px-0">
              <button className="w-full shadow-[inset_0px_3px_2px_-2px_rgba(255,255,255,1)] bg-primary px-4 py-2 rounded-sm text-white cursor-pointer hover:bg-white hover:text-black transition-colors duration-300">
                Get Started
              </button>
            </Link>
          </div>

          <div className="heroimg-container relative z-10 w-full p-8">
            <div className=" flex justify-center items-center">
              <div className="bg-gray-800 rounded-lg shadow-lg max-w-full max-h-full w-[90vw] md:w-[800px]">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-t-lg">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                <img
                  src={dashboardPage}
                  alt="Dashboard Screenshot"
                  className="rounded-b-lg max-w-full max-h-[80vh] object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="about-section bg-gray-950 pt-8 rounded-t-[350px] shadow-[inset_0px_3px_2px_-2px_rgba(255,255,255,0.5)]">
          <div className="flex justify-center p-8 flex-col items-center gap-8 text-white">
            <h1 className="text-[clamp(1.5rem,5vw,3rem)] max-w-4xl text-center font-semibold leading-[1.3]">
              Bring all your expenses, tools, and smart tracking into one place.
            </h1>
            <div className="hidden lg:flex justify-center items-center gap-6 text-[12px] uppercase text-gray-200 text-center flex-wrap">
              <span className="flex justify-center items-center gap-3">
                <img
                  className="w-[24px]"
                  src={dashboardIcon}
                  alt="dashboardIcon"
                />
                <p>Dashboard</p>
              </span>
              |
              <span className="flex justify-center items-center gap-3">
                <img className="w-[24px]" src={expenseIcon} alt="expenseIcon" />
                <p>Expense</p>
              </span>
              |
              <span className="flex justify-center items-center gap-3">
                <img className="w-[24px]" src={incomeIcon} alt="incomeIcon" />
                <p>Income</p>
              </span>
              |
              <span className="flex justify-center items-center gap-3">
                <img className="w-[24px]" src={aiIcon} alt="aiIcon" />
                <p>Ai</p>
              </span>
              |
              <span className="flex justify-center items-center gap-3">
                <img className="w-[24px]" src={labsIcon} alt="labsIcon" />
                <p>Experiments Lab</p>
              </span>
              |
              <span className="flex justify-center items-center gap-3">
                <img className="w-[24px]" src={exportIcon} alt="exportIcon" />
                <p>Export</p>
              </span>
            </div>
          </div>

          <div className="detailed-feature pt-8 px-2 sm:px-4 md:px-6 lg:px-30 md:py-30 flex flex-col gap-30">
            <div className="feature1 text-white flex flex-col lg:flex-row gap-5">
              <div className="left p-2 flex flex-col gap-3.5 flex-1">
                <div className="flex gap-6 text-[12px] uppercase text-gray-200">
                  <span className="flex justify-center items-center gap-3">
                    <img
                      className="w-[24px]"
                      src={dashboardIcon}
                      alt="dashboardIcon"
                    />
                    <p>Dashboard</p>
                  </span>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3.5">
                    <h1 className="text-[32px]">
                      Your finances, finally simplified.
                    </h1>
                    <p className="text-[18px] lg:max-w-[500px]">
                      The dashboard unifies your expenses, budgets, categories,
                      and insights into one clear view. Dive into your spending
                      habits, explore visual charts, link accounts, and stay on
                      top of what matters. It’s your financial snapshot—smart,
                      simple, and always up to date.
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-center items-center gap-5 max-w-[500px]">
                    <span className="text-5xl text-primary">80%</span>
                    <p className="text-[18px] ">
                      of users report gaining better control over their spending
                      using the dashboard.
                    </p>
                  </div>
                </div>
              </div>
              <div className="right p-2 flex-1">
                <div className="flex justify-center items-center">
                  <div className="bg-gray-800 rounded-lg shadow-lg ">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-t-lg">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>

                    <img
                      src={dashboardPage}
                      alt="Dashboard Screenshot"
                      className="rounded-b-lg object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="feature2 text-white flex gap-5 lg:gap-20 flex-col lg:flex-row-reverse ">
              <div className="left p-2 flex flex-col gap-3.5 flex-1">
                <div className="flex gap-6 text-[12px] uppercase text-gray-200">
                  <span className="flex justify-center items-center gap-3">
                    <img
                      className="w-[24px]"
                      src={expenseIcon}
                      alt="expenseIcon"
                    />
                    <p>Expense</p>
                  </span>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3.5">
                    <h1 className="text-[32px]">
                      Access your complete spending history.
                    </h1>
                    <p className="text-[18px] lg:max-w-[500px]">
                      Need to review what you spent last month? Or track how a
                      category has changed over time? Your Expense page brings
                      every transaction into one clear view, supported by
                      monthly charts that help you understand your spending
                      patterns instantly.
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-center items-center gap-5 max-w-[500px]">
                    <span className="text-5xl text-expense">68%</span>
                    <p className="text-[18px] ">
                      of users say seeing all expenses in one place helps them
                      stay more in control.
                    </p>
                  </div>
                </div>
              </div>
              <div className="right p-2 flex-1">
                <div className="flex justify-center items-center">
                  <div className="bg-gray-800 rounded-lg shadow-lg ">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-t-lg">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>

                    <img
                      src={expensePage}
                      alt="expensePage"
                      className="rounded-b-lg object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="feature3 text-white flex flex-col lg:flex-row gap-5">
              <div className="left p-2 flex flex-col gap-3.5 flex-1">
                <div className="flex gap-6 text-[12px] uppercase text-gray-200">
                  <span className="flex justify-center items-center gap-3">
                    <img
                      className="w-[24px]"
                      src={incomeIcon}
                      alt="incomeIcon"
                    />
                    <p>Income</p>
                  </span>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3.5">
                    <h1 className="text-[32px]">
                      Access your complete income overview.
                    </h1>
                    <p className="text-[18px] lg:max-w-[500px]">
                      Need to review how much you earned last month? Or compare
                      your income across different sources? Your Income page
                      brings all your earnings together in one clear, organized
                      view, supported by monthly charts that make it easy to
                      understand your income patterns at a glance.
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-center items-center gap-5 max-w-[500px]">
                    <span className="text-5xl text-budget">72%</span>
                    <p className="text-[18px] ">
                      of users say having all income data in one place helps
                      them plan their finances more effectively.
                    </p>
                  </div>
                </div>
              </div>
              <div className="right p-2 flex-1">
                <div className="flex justify-center items-center">
                  <div className="bg-gray-800 rounded-lg shadow-lg ">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-t-lg">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>

                    <img
                      src={incomePage}
                      alt="Dashboard Screenshot"
                      className="rounded-b-lg object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ai-section pt-30 px-2 sm:px-4 md:px-8 lg:pt-5 lg:px-30">
          <div className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-700 rounded-lg flex flex-col lg:flex-row px-5 py-8 lg:py-4 gap-5">
            <div className="left flex flex-col gap-3.5 flex-1 justify-center">
              <div className="flex gap-6 text-[12px] uppercase text-gray-200">
                <span className="flex justify-center items-center gap-3">
                  <img className="w-[24px]" src={aiIcon} alt="aiIcon" />
                  <p>Ai</p>
                </span>
              </div>
              <div className="flex flex-col gap-8 text-white">
                <div className="flex flex-col gap-3.5">
                  <h1 className="text-[32px]">
                    The perfect AI assistant for your money.
                  </h1>
                  <p className="text-[18px] lg:max-w-[500px]">
                    Your AI financial assistant is live! Ask any question about
                    your spending — from total expenses and top categories to
                    your savings and cash flow — and get instant, personalized
                    insights. Make smarter, data-driven financial decisions,
                    simply by asking.
                  </p>
                </div>
                <Link to="dashboard">
                  <button className="text-primary hover:underline underline-offset-4 cursor-pointer w-fit">
                    Explore now →
                  </button>
                </Link>
              </div>
            </div>
            <div className="right hidden p-2 sm:flex flex-1">
              <div className="flex justify-center items-center">
                <div className="bg-gray-800 rounded-lg shadow-lg ">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-t-lg">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>

                  <img
                    src={aiPage}
                    alt="aiPage"
                    className="rounded-b-lg object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-cta  relative py-30 px-2 sm:px-4 md:px-8 lg:px-30">
          <div className="relative overflow-hidden px-5 py-8 lg:p-30 z-0 flex justify-center items-center text-white flex-col gap-10 sm:shadow-[inset_0_3px_2px_-2px_rgba(255,255,255,0.5),inset_0_-3px_2px_-2px_rgba(255,255,255,0.5)] sm:rounded-[50px]">
            <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_70%)] z-0"></div>
            <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_35%)] scale-250 z-0"></div>
            <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_20%)] scale-300 z-0"></div>

            <h1 className="relative z-1 text-[clamp(1.5rem,5vw,3rem)] text-center">
              See all that you can accomplish in Spendwise.
            </h1>

            <div className="relative z-1 flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-10 w-full">
              <Link to="dashboard" className="w-full sm:w-[150px]">
                <button className="w-full text-[clamp(1rem,5vw,1.rem)] shadow-[inset_0px_3px_2px_-2px_rgba(255,255,255,1)] py-4 sm:py-3 px-4 rounded-sm bg-primary cursor-pointer hover:text-black hover:bg-white transition-all duration-300">
                  Get Started
                </button>
              </Link>
              <Link to="docs" className="w-full sm:w-[150px]">
                <button
                  className="w-full shadow-[inset_0_3px_2px_-2px_rgba(256,256,256,1),inset_0_-1px_1px_-1px_rgba(256,256,256,1),inset_1px_0_1px_-1px_rgba(256,256,256,1),inset_-1px_0_1px_-1px_rgba(256,256,256,1)]
                  py-4 sm:py-3 px-4 rounded-sm cursor-pointer hover:text-black hover:bg-white transition-all duration-300"
                >
                  Documentation
                </button>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
