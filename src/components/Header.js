import logo from "../images/studio-logo.png";
import Headroom from "react-headroom";
export default function Header() {
  return (
    <Headroom style={{ background: "rgba(28, 25, 23, 0.95)" }}>
      <div className="py-3 md:py-4 flex justify-center items-center shadow-sm shadow-green-500">
        <img src={logo} className="w-16 h-16 md:w-24 md:h-24" alt="" />
        <p className="text-4xl font-londrina font-bold text-white">
          @lb540studio
        </p>
      </div>
    </Headroom>
  );
}
