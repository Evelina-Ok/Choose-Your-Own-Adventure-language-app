type Props={
    text: string;
}
const Button = ({text}:Props) => {
    return (
        <>
        <button className="w-80 mb-8 bg-white text-black font-bold font-amatic py-3 rounded-full ">
            {text}
        </button>
        </>
    )
}

export default Button;