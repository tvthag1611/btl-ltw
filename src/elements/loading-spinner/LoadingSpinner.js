import "./LoadingSpinner.css";
import Loading from "../../assets/logo/loading.svg";

const LoadingSpinner = () => {
  return (
    <div className="flex h-full items-center justify-center loading w-full">
      <img src={Loading} alt="" className="loading-page w-12 h-12" />
    </div>
  );
};

export default LoadingSpinner;
