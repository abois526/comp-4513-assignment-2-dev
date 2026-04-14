import { Spinner } from "./ui/spinner";

function CustomSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <Spinner className="size-24" />
    </div>
  );
};

export default CustomSpinner;