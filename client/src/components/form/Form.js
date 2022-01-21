import React, { useContext } from "react";

import axios from "axios";
import { UserDataContext } from "../../store/UserDataProvider";
import { RiGithubFill } from "react-icons/ri";

const Form = ({ searchUser }) => {
  const { setData } = useContext(UserDataContext);
  // https://api.github.com/users/defunkt

  const dataHandler = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    if (username !== "") {
      await axios
        .get(`https://api.github.com/users/${username}`)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        });
      searchUser();
    }
  };

  return (
    <form className="form" onSubmit={dataHandler}>
      <RiGithubFill className="form__icon" />
      <label className="form__label">Username</label>
      <input type="text" className="form__input" name="username" />
    </form>
  );
};

export default Form;
