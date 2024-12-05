import { NavLink } from "react-router-dom";
import { Language } from "../../../types";
import FlagCard from "../../components/FlagCard";
import { BackArrow } from "../../components/BackArrow";
import { useStory } from "../../hooks/useStory";

type Flag = {
  country: Language;
  image: string;
};

export function FlagPage() {
  const { changeLanguage } = useStory();
  const flags: Flag[] = [
    { country: "American", image: "src/assets/usaFlag.svg" },
    { country: "Spanish", image: "src/assets/SpainFlag.svg" },
    { country: "Icelandic", image: "src/assets/IcelandFlag.svg" },
    { country: "Italian", image: "src/assets/ItalyFlag.svg" },
    { country: "Polish", image: "src/assets/PolandFlag.svg" },
    { country: "Norwegian", image: "src/assets/NorwayFlag.svg" },
    { country: "German", image: "src/assets/GermanFlag.svg" },
    { country: "Danish", image: "src/assets/DenmarkFlag.svg" },
  ];

  return (
    <>
      <BackArrow />
      <div className="min-h-screen w-dvw bg-gray-500 flex flex-col items-center px-4 py-8">
        <h1 className="my-10 mb-4 text-3xl font-bold  text-white text-center font-['Amatic_SC']">
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
