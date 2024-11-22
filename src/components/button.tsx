type Props={
    text: string;
}
const Button = ({text}:Props) => {
    return (
        <button className="w-80 bg-white text-black py-3 rounded-full ">{text}</button>
    )
}

export default Button;