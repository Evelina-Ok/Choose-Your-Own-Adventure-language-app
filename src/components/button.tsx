type Props={
    text: string;
    onClick?: () => void; 
}
const Button = ({text, onClick}:Props) => {
    return (
        <button onClick={onClick} className="w-80 mb-8 bg-white text-black font-bold font-['Amatic_SC'] text-3xl py-3 rounded-full ">
            {text}
        </button>
        )
}

export default Button;