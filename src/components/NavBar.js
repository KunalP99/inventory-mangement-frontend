import { Link } from "react-router-dom";
import Logo from "../images/logo.svg";

const NavBar = () => {
  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <img src={Logo} alt='Logo' />
          <h1>
            Games Inventory<span>_</span>
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
