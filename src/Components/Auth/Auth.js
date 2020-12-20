import React, { Component } from "react";
import { Formik } from "formik";

class Auth extends Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({values, handleChange, handleSubmit}) => (
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your Email"
                  className="form-control"
                  value={values.email}
                  onChange={handleChange}
                />
                <br/>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={values.password}
                  onChange={handleChange}
                />
                <br/>
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confrim password"
                  className="form-control"
                  value={values.passwordConfirm}
                  onChange={handleChange}
                />
                <br/>
              <button type="submit" className="btn btn-success">Sign Up</button>
              </form>

            </div>
          )}
        </Formik>
      </div>
    );
  }
}

export default Auth;
