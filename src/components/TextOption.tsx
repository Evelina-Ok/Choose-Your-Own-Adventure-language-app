import { XStack } from "../UI/XStack";

type TextOptionProps = {
  text: string;
  speech?: boolean;
  onChange: (value: string) => void;
};

export const TextOption = (props: TextOptionProps) => {
  return (
    <XStack>
      <div>Text option goes here</div>
    </XStack>
  );
};
