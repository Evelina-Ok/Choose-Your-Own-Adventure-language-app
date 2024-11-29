type OptionsProps = {
  options: [string, string, string];
  onSelect: (option: string) => void;
};

export const Options = ({ options, onSelect }: OptionsProps) => {
  console.log("rendering Options");
  return (
    <div>
      {options.map((option, index) => (
        <Option key={index} text={option} onClick={() => onSelect(option)} />
      ))}
    </div>
  );
};

const Option = ({
  text,
  ...props
}: {
  text: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props}>{text}</div>;
};
