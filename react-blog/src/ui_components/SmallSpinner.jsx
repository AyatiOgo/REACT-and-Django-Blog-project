import { ScaleLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader";

const override =  {
    display: "block",
    borderColor: "white",
    color : "white"
  };

const SmallSpinner = () => {
  return (
    <ScaleLoader
        color="white"
        cssOverride={override}
        size={16}
        height={16}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default SmallSpinner