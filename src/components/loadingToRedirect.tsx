import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  forAdmin?: boolean;
}

const LoadingToRedirect = ({ forAdmin }: Props) => {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && history.push("/");
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  return (
    <div className="container p-5 text-center">
      <p>
        Sign {`${forAdmin ? "as admin" : ""}`} in to view this page ..
        redirecting you in ... {count} seconds
      </p>
    </div>
  );
};

export default LoadingToRedirect;
