import React from "react";

const UserInput = ({ label, ...props }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
    </div>
  );
};

export default UserInput;
