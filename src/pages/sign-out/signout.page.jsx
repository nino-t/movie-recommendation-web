import React from "react";
import { useNavigate } from "react-router-dom";

const SignOutPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/browse", { replace: true });
  }, [navigate]);

  return null;
};

export default SignOutPage;
