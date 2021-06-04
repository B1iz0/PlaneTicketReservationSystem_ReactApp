import React from "react";
import Button from "@material-ui/core/Button";

import ProfileDropdownMenu from "./ProfileDropdownMenu";

const Profile = ({ userEmail }) => {
  return userEmail ? (
    <ProfileDropdownMenu userEmail={userEmail} />
  ) : (
    <Button href="/SignIn" variant="contained" color="primary">
      Sign in
    </Button>
  );
};

export default Profile;
