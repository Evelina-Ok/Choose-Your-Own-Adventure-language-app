import { BackArrow } from "../../components/BackArrow";

import { Game } from "../../components/game";

export function GamePage() {
  return (
    <div className="flex flex-col h-full">
      <BackArrow />
      <Game />
    </div>
  );
}
