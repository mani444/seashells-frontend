import React from "react";
import classes from "./Backdrop.module.css";

interface IBackdrop {
  show?: boolean;
  color?: string;
  alpha?: boolean;
  onClick?: any;
  children?: React.ReactNode;
}

const defaultProps: IBackdrop = {
  show: true,
  color: "#00000",
  alpha: true,
  onClick: () => {},
};
const Backdrop: React.FC<IBackdrop> = ({ show, alpha, onClick, children }) => {
  // const alphaclass = alpha ? "backdrop-black" : "backdrop-black-noalpha";

  // console.log(`${classes["backdrop"]} ${classes[alphaclass]}`);

  return (
    <div
      className={`${classes["backdrop"]} ${classes["backdrop-black"]}`}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </div>
  );
};

Backdrop.defaultProps = defaultProps;
export default Backdrop;
