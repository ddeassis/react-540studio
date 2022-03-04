import logo from "../images/studio-logo.png";
import Headroom from "react-headroom";
export default function Header() {
  return (
    <Headroom>
      <div className="py-3 md:py-4 flex flex-col justify-center items-center shadow-sm shadow-black">
        <img src={logo} className="w-16 h-16 md:w-24 md:h-24" alt="" />
        <p className="text-4xl font-londrina text-white">
          @lb540studio
        </p>
      </div>
    </Headroom>
  );
}
