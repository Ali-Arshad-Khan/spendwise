import { useContext } from "react";
import { DashboardContext } from "../components/DashboardProvider";
import circle from "../assets/images/circle.png";
import tick from "../assets/images/tick.png";

export default function Experiment() {
  const { flag, pp, setFlag } = useContext(DashboardContext);

  return (
    <div
      className="h-[100vh] flex w-full bg-cover bg-center bg-mainbg bg-no-repeat"
      style={pp}
    >
      <div className="main h-full lg:ml-[280px] w-full flex-1 text-white py-[30px] px-[20px] md:px-[20px] lg:px-[30px]">
        <div className="dashboard-title mb-[20px] flex items-center gap-5">
          <h2 className="text-[clamp(16px,2.5vw,32px)] font-bold mb-2">
            Experiments Lab
          </h2>
        </div>
        <div className="flex-col w-full ai-container h-[80vh] flex gap-5  bg-cover bg-center bg-no-repeat rounded-lg">
          <h2>
            New features are on the way, with both free and paid versions coming
            soon.
          </h2>
          <div className="feature1 p-3.5 rounded-[10px] hover:bg-gray-900 cursor-pointer bg-gray-800 w-fit ">
            <div onClick={() => setFlag(!flag)} className="flex flex-col gap-6">
              {flag ? (
                <img className="w-6" src={tick} alt="tick" />
              ) : (
                <img className="w-6" src={circle} alt="circle" />
              )}
              <h1 className="text-white">Translucent Blur</h1>
            </div>
          </div>
          <div className="feature1 p-3.5 rounded-[10px] hover:bg-gray-900 cursor-pointer border border-gray-800 w-[200px] h-[100px] bg-white/4 backdrop-blur-md">
            <h2>Next Feature</h2>
            <h3 className="text-gray-300">Coming Soon</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
