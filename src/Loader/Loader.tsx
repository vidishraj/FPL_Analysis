import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={'/plLogo.png'} alt="Loading..." className="loader-image" />
    </div>
  );
};

export default Loader;
