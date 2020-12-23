import React, { Component } from "react";
import Spinner from "../Spinner/Spinner.js";
import { auth } from "../../redux/authActionCreators.js";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Alert } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    authLoading: state.authLoading,
    authFailedMsg: state.authFailedMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, signUpMode) =>
      dispatch(auth(email, password, signUpMode)),
  };
};

class Auth extends Component {
  state = {
    signUpMode: true,
  };
  switchModeHandler = () => {
    //console.log(this.state.signUpMode);s
    this.setState((state) => {
      return { signUpMode: !state.signUpMode };
    });
  };
  render() {
    let error = null;
    console.log("this.props.authFailedMsg :",this.props.authFailedMsg);
    if(this.props.authFailedMsg !== null){
      error = <Alert color="warning">{this.props.authFailedMsg}</Alert>
    }
    let form = null;
    if (this.props.authLoading) {
      form = <Spinner />;
    } else {
      form = (
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          onSubmit={(values) => {
            console.log("Values :", values);
            this.props.auth(
              values.email,
              values.password,
              this.state.signUpMode
            );
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 6) {
              if (this.state.signUpMode) {
                errors.password = "Must must be at least 6 Characters";
              }
            }
            if (this.state.signUpMode) {
              if (!values.passwordConfirm) {
                errors.passwordConfirm = "Required";
              } else if (values.password !== values.passwordConfirm) {
                errors.passwordConfirm = "Password dose not matched";
              }
            }

            //console.log("errors",errors);
            return errors;
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <div
              style={{
                border: "1px solid #e6e8e8",
                padding: "15px",
                borderRadius: "7px",
              }}
            >
              <button
                onClick={this.switchModeHandler}
                style={{
                  width: "100%",
                  backgroundColor: "#f55195",
                  color: "white",
                }}
                className="btn btn-lg"
              >
                Switch to {this.state.signUpMode ? "Login" : "Sign Up"}
              </button>
              <br />
              <br />
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your Email"
                  className="form-control"
                  value={values.email}
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>{errors.email}</span>
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={values.password}
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>{errors.password}</span>
                <br />
                {this.state.signUpMode ? (
                  <div>
                    <input
                      type="password"
                      name="passwordConfirm"
                      placeholder="Confrim password"
                      className="form-control"
                      value={values.passwordConfirm}
                      onChange={handleChange}
                    />
                    <span style={{ color: "red" }}>
                      {errors.passwordConfirm}
                    </span>
                    <br />
                  </div>
                ) : null}

                <button type="submit" className="btn btn-success">
                  {this.state.signUpMode ? "Sign up" : "Login"}
                </button>
              </form>
            </div>
          )}
        </Formik>
      );
    }
    return (
        <div>
          {error}
          {form}
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
