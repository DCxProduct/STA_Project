import Preloader from "./Preloader";

const PreloaderPrimary = () => {
  return (
    <div className="animate-preloader opacity-0 invisible fixed top-180 left-0 -z-1 w-full transition-all duration-500">
      <Preloader />
    </div>
  );
};

export default PreloaderPrimary;
