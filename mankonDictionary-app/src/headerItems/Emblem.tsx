import "./headerItems.css";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
    to: string;
}

function Emblem({to}:ButtonProps) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(to);
    };
    return <img 
                src="https://raw.githubusercontent.com/danakenneyl/MankonDictionary/dev/MACUDAMN.jpg" 
                alt="Company Emblem" 
                className="emblem"
                onClick={handleClick}
            />
}

export default Emblem