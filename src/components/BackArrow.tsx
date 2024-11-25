import BackArrowIcon from '../assets/BackArrow.svg'; 
 
interface BackArrowProps {
  onClick?: () => void;
}

const BackArrow: React.FC<BackArrowProps> = ({ onClick }) => {
  const handleBackClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log('Back button clicked!'); 
    }
  };

  return (
    <button
      onClick={handleBackClick}
      className="absolute top-4 left-4 text-2xl cursor-pointer focus:outline-none"
   
    >
      {}
      <img src={BackArrowIcon} alt="Back Arrow" className="w-45px h-40px mr-25 mt-25" />
    </button>
  );
};

export default BackArrow;
