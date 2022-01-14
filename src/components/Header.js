import logo from "../images/studio-logo.png";
import Headroom from "react-headroom";
export default function Header() {
  return (
    <Headroom style={{ background: "rgba(28, 25, 23, 0.95)" }}>
      <div className="py-3 md:py-4 flex flex-col justify-center items-center shadow-sm shadow-green-500">
        <img src={logo} className="w-24 h-24" alt="" />
        <p className="text-3xl font-londrina text-green-500">@lb540studio</p>
      </div>
    </Headroom>
  );
}
