import { FullScreenWrapper } from "../UI/FullScreenWrapper";
import { YStack } from "../UI/YStack";
import { TextOption } from "../components/TextOption";
import { GameNavigation } from "../components/GameNavigation";

export const GameScreen = () => {
  return (
    <FullScreenWrapper className="bg-red-50 justify-center items-center">
      <YStack>
        <h1>Game Screen</h1>
        <TextOption text="Option 1" onChange={() => {}} speech />
        <GameNavigation></GameNavigation>
      </YStack>
    </FullScreenWrapper>
  );
};
