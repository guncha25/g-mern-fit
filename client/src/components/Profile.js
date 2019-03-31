import React, { useContext } from "react";
import Layout from "./Layout";
import { UserCtx } from "./UserContext";

const Profile = () => {
  const { user } = useContext(UserCtx);
  return (
    <Layout>
      <div>
        <h3>Username: {user.username}</h3>
      </div>
      <div>
        <h3>Email: {user.email}</h3>
      </div>
    </Layout>
  );
};

export default Profile;
