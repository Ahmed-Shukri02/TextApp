import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    document.title="Redirecting to feed..."
    navigate("/feed");
  }, []);

  return <div> This is the home page </div>;
}
