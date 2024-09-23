// This is a work in progress. We are trying to implement google auth, so just picture some 'Construction' signs

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // token is sent via the url so using params to extract
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      console.log("Token stored successfully:", token);

      // Harsh will give me the required url as currently it links to a placeholder dashboard.
      navigate("/vision-boards");
    } else {
      console.error("No token found in the URL");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
