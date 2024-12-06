import { NavLink } from "react-router-dom";
import { Language } from "../../../types";
import FlagCard from "../../components/FlagCard";
import { BackArrow } from "../../components/BackArrow";
import { useStory } from "../../hooks/useStory";
import american from "../../assets/usaFlag.svg";
import spanish from "../../assets/SpainFlag.svg";
import icelandic from "../../assets/IcelandFlag.svg";
import italian from "../../assets/ItalyFlag.svg";
import polish from "../../assets/PolandFlag.svg";
import norwegian from "../../assets/NorwayFlag.svg";
import german from "../../assets/GermanFlag.svg";
import danish  from "../../assets/DenmarkFlag.svg";


type Flag = {
  country: Language;
  image: string;
};

export function FlagPage() {
  const { changeLanguage } = useStory();
  const flags: Flag[] = [
    { country: "American", image: american },
    { country: "Spanish", image: spanish },
    { country: "Icelandic", image: icelandic },
    { country: "Italian", image: italian },
    { country: "Polish", image: polish },
    { country: "Norwegian", image: norwegian },
    { country: "German", image: german },
    { country: "Danish", image: danish },
  ];

  return (
    <>
      <BackArrow />
      <div className="  bg-gradient-to-b from-backgroundTop to-backgroundBttn min-h-screen w-dvw flex flex-col items-center px-4 py-8">
        <h1 className="my-8 mb-3 text-4xl px-2 font-bold  text-white text-center font-['Jersey_10']">
          CHOOSE LANGUAGE YOU WANT TO LEARN
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 ">
          {flags.map((flag) => (
            <NavLink key={flag.country} to={"/game"}>
              <FlagCard
                key={flag.country}
                country={flag.country}
                image={flag.image}
                onClick={() => changeLanguage(flag.country)}
              />
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
