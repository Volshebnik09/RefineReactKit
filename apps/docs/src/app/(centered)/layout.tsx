import { PropsWithChildren } from "react";

export default (props: PropsWithChildren) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {props.children}
    </div>
  );
};
