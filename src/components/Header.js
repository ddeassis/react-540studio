import logo from "../images/studio-logo.png";
import Headroom from "react-headroom";
export default function Header() {
  return (
    <Headroom style={{ background: "rgba(28, 25, 23, 0.85)" }}>
      <div className="py-3 md:py-4 flex justify-center items-center">
        <img src={logo} className="inline w-24 h-24" alt="" />
        <p className="text-3xl font-londrina">@lb540studio</p>
      </div>
    </Headroom>
  );
}
