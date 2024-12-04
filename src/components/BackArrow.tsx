import { NavLink } from "react-router";
import BackArrowIcon from "../assets/BackArrow.svg";

export const BackArrow = () => {
  return (
    <NavLink
      to={"/"}
      role="button"
      className="absolute top-4 left-4 text-2xl border-none cursor-pointer outline-none bg-transparent"
    >
      <img
        src={BackArrowIcon}
        alt="Back Arrow"
        className="w-45px h-40px mr-25 mt-25"
      />
    </NavLink>
  );
};
