import React, { useRef, useContext, useState } from "react";
import { useHistory } from "react-router";

import AuthService, { AuthContext } from "../../services/User/User-service";
import RepeatPassword from "../UI/RepeatPassword";

import Loader from "../UI/Loader";

import styles from "./SignUpForm.module.css";

const SignUpForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState()
  const [nameError, setNameError] = useState()
  const [lastnameError, setLastnameError] = useState()
  const [telephoneError, setTelephoneError] = useState()
  const [addressError, setAddressError] = useState()

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  let errorMsg = "";
  let enteredPassword = "";
  let emailInputRef = useRef();
  let nameInputRef = useRef();
  let lastnameInputRef = useRef();
  let phoneInputRef = useRef();
  let addressInputRef = useRef();


  const getNewPassword = (pwd) => {
    enteredPassword = pwd;
  }


  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredLastname = lastnameInputRef.current.value;
    const enteredTelephone = phoneInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;

    const response = await AuthService.signUp({
      email: enteredEmail,
      password: enteredPassword,
      name: enteredName,
      lastname: enteredLastname,
      telephone: enteredTelephone,
      address: enteredAddress
    });

    if (response.errors) {
      setLoading(false);
      if (response.errors.name) {
        setNameError(response.errors.name)
      }
      if (response.errors.lastname) {
        setLastnameError(response.errors.lastname)
      }
      if (response.errors.telephone) {
        setTelephoneError(response.errors.telephone)
      }
      if (response.errors.address) {
        setAddressError(response.errors.address)
      }
      if (response.errors.email) {
        setEmailError(response.errors.email)
      }

      
    } else {
      const userData = await AuthService.login({
        email: enteredEmail,
        password: enteredPassword,
      });
      authCtx.updateAuthState(userData);
      history.push("/");
    }

  };

  if (loading) {
    return (<Loader />)
  }

  return (
    <form onSubmit={submitHandler} className={styles["login-form"]}>
      <section className={styles["input-section"]}>
        <label htmlFor="email">Email</label>
        <input className={emailError && "error-input"} ref={emailInputRef} type="email" id="email" name="email" />
        {emailError && <span className="text-danger">{emailError}</span>}
      </section>
      <section className={styles["input-section"]}>
        <label htmlFor="name">Nombre</label>
        <input className={nameError && "error-input"} ref={nameInputRef} type="text" id="name" name="name" />
        {nameError && <span className="text-danger">{nameError}</span>}
      </section>
      <section className={styles["input-section"]}>
        <label htmlFor="lastname">Apellido</label>
        <input  className={lastnameError && "error-input"} ref={lastnameInputRef} type="text" id="lastname" name="lastname" />
        {lastnameError && <span className="text-danger">{lastnameError}</span>}
      </section>
      <section className={styles["input-section"]}>
        <label htmlFor="telephone">Teléfono</label>
        <input className={telephoneError && "error-input"} ref={phoneInputRef} type="text" id="telephone" name="telephone" />
        {telephoneError && <span className="text-danger">{telephoneError}</span>}
      </section>
      <section className={` mb-5 ${styles["input-section"]}`}>
        <label htmlFor="address">Domicilio</label>
        <input className={addressError && "error-input"} ref={addressInputRef} type="text" id="address" name="address" />
        {addressError && <span className="text-danger">{addressError}</span>}
      </section>
      <RepeatPassword passwordHandler={getNewPassword} errorMsg={errorMsg}/>

      <button className="gibson-medium">Registrarse</button>
    </form>
  );
};

export default SignUpForm;
