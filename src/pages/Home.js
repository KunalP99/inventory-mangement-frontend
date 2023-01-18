import { Link } from "react-router-dom";
import HeroImage from "../images/hero-img.png";

const Home = () => {
  return (
    <div className='home-container'>
      <div className='hero-container'>
        <img src={HeroImage} alt='Hero image' />
        <div>
          <h2>Take control of your games, never misplace a title again.</h2>
          <div className='action-btn-container'>
            <Link className='action-btn' to={"/api/inventory"}>
              Your Inventory
            </Link>
          </div>
        </div>
      </div>
      <div className="features-section"></div>
    </div>
  );
};

export default Home;
