import logo from "../images/studio-logo.png";
import Headroom from "react-headroom";
export default function Header() {
  return (
    <Headroom>
      <div className="py-3 md:py-4 px-4 md:px-6 lg:px-8 flex justify-start items-center gap-x-4 md:gap-x-6 lg:gap-x-8 shadow-md shadow-stone-700">
        <img src={logo} className="w-16 h-16 md:w-24 md:h-24" alt="" />
        <p className="text-4xl font-londrina text-white">@lb540studio</p>
      </div>
    </Headroom>
  );
}
