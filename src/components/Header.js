import logo from "../images/studio-logo.png";
import Headroom from "react-headroom";
import { HiPlus } from "react-icons/hi";

export default function Header({ requestHandler, showForm }) {
  return (
    <Headroom>
      <div className="py-3 md:py-4 px-4 md:px-6 lg:px-8 flex justify-between items-center gap-x-4 md:gap-x-6 lg:gap-x-8 shadow-md shadow-stone-700">
        <div className="flex items-center gap-x-6">
          <img src={logo} className="w-16 h-16 md:w-24 md:h-24" alt="" />
          <p className="text-4xl font-londrina text-white">@lb540studio</p>
        </div>

        <button
          title="Request our Services"
          onClick={requestHandler}
          className={`flex items-center justify-center w-10 h-10 md:w-16 md:h-16 z-20 rounded-full bg-teal-700  border border-white transition duration-500 ease-in-out ${
            showForm && ` -rotate-45`
          }`}
        >
          <HiPlus className="w-12 h-12 text-stone-50" />
          <span className="sr-only">Make a Request for Services</span>
        </button>
      </div>
    </Headroom>
  );
}
