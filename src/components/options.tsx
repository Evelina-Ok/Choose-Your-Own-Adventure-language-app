type OptionsProps = {
  options: [string, string, string];
  onSelect: (option: string) => void;
  selectedOption: string;
};

export const Options = ({
  options,
  onSelect,
  selectedOption,
}: OptionsProps) => {
  
  return (
    <div className="flex flex-col gap-4">
      {options.map((option, index) => {
        console.log(selectedOption=== option);
        
        return (
        <Option key={index} text={option} onClick={() => onSelect(option)}
        isSelected={selectedOption=== option} />
)})}
    </div>
  );
};

interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  isSelected: boolean;
}

const Option = ({
  text,
  isSelected = false,
  ...props
}: OptionProps) => {
  

  return (
    <div {...props} className={`bg-green-200  ${isSelected && "bg-red-200"}`}>
      {text}
    </div>
  );
};