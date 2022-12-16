import Backdrop from "./Backdrop/Backdrop";
import { CircularProgress } from "@mui/material";

interface ICircularSpinner extends React.HTMLAttributes<HTMLDivElement> {
  backdropAlpha?: boolean;
}
export const CircularSpinner: React.FC<ICircularSpinner> = ({
  backdropAlpha,
}) => {
  return (
    <Backdrop alpha={backdropAlpha}>
      <CircularProgress />
    </Backdrop>
  );
};
