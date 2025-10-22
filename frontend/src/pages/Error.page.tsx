import * as React from "react";

interface ErrorProps {
  children: React.ReactElement;
}

const Error: React.FC<ErrorProps> = ({ children }) => {
  return (
    <div>
      page not found
      {children}
    </div>
  );
};

export default Error;
