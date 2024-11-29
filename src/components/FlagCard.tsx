interface FlagCardProps {
  country: string;
  image: string;
  onClick?: () => void;
}

const FlagCard: React.FC<FlagCardProps> = ({ country, image, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg p-4 flex flex-col items-center bg-white/0"
    >
      <img
        src={image}
        alt={`${country} flag`}
        className="w-20 h-20 object-cover rounded-full mb-2"
      />
      <h2 className="text-lg font-semibold">{country}</h2>
    </button>
  );
};

export default FlagCard;
