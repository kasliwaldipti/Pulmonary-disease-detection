import React from "react";
import fire from "../firebase/config";

const DashBoard = () => {
  let user = fire.auth().currentUser;

  const handleLogout = () => {
    fire.auth().signOut();
  };

  return (
    <section>
      <nav>
        <h2>Welcome {user.email}</h2>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </section>
  );
};

export default DashBoard;
