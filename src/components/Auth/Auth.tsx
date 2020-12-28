import React, { Component } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";

import { login, signup } from "../../firebase/functions";
import { RouteComponentProps } from "react-router-dom";

interface Props {}

interface State {
  isLogIn: boolean;
}

interface FormType {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
}

export default class Auth extends Component<
  Props & RouteComponentProps,
  State
> {
  state = {
    isLogIn: true,
  };

  toggleLogin = () => {
    this.setState((prevState) => ({
      isLogIn: !prevState.isLogIn,
    }));
  };

  render() {
    return (
      <div className="dark:bg-black dark:text-white bg-gray-50 min-h-screen py-6 px-4">
        <div className="max-w-xl p-12 sm:mt-12 mx-auto bg-blue-50 dark:bg-darkSecondary shadow">
          <h1 className="uppercase text-center text-xl tracking-wide sm:text-2xl">
            {this.state.isLogIn
              ? "Log in to your account"
              : "Create a new account"}
          </h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              name: "",
            }}
            validate={(values) => {
              const errors: FormType = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              } else if (values.password.trim().length < 6) {
                errors.password = "Password must be at least 6 characters";
              }

              if (!this.state.isLogIn) {
                if (values.password !== values.confirmPassword) {
                  errors.confirmPassword = "Passwords do not match";
                } else if (values.name.length === 0) {
                  errors.name = "Name field cannot be empty";
                }
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              let user: any = {};
              if (this.state.isLogIn) {
                console.log("[AUTH] LOG IN");
                user = await login(values.email, values.password);
              } else {
                console.log("[AUTH] SIGN UP");
                user = await signup(values.email, values.password);
              }
              setSubmitting(false);
              if (user) {
                this.props.history.replace("/");
              } else {
                console.log("FAILED");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-12">
                <div>
                  <h1 className="mb-2">Email</h1>
                  <Field
                    type="email"
                    name="email"
                    className="w-full h-10 pl-6 dark:bg-gray-700"
                  />
                  <ErrorMessage
                    name="email"
                    render={(message) => (
                      <div className="text-red-400 mt-2">{message}</div>
                    )}
                  />
                </div>
                {!this.state.isLogIn && (
                  <>
                    <div className="h-4"></div>
                    <div>
                      <h1 className="mb-2">Full Name</h1>
                      <Field
                        type="text"
                        name="name"
                        className="w-full h-10 pl-6 dark:bg-gray-700"
                      />
                      <ErrorMessage
                        name="name"
                        render={(message) => (
                          <div className="text-red-400 mt-2">{message}</div>
                        )}
                      />
                    </div>
                  </>
                )}
                <div className="h-4"></div>
                <div>
                  <h1 className="mb-2">Password</h1>
                  <Field
                    type="password"
                    name="password"
                    className="w-full h-10 pl-6 dark:bg-gray-700"
                  />
                  <ErrorMessage
                    name="password"
                    render={(message) => (
                      <div className="text-red-400 mt-2">{message}</div>
                    )}
                  />
                </div>
                {!this.state.isLogIn && (
                  <>
                    <div className="h-4"></div>
                    <div>
                      <h1 className="mb-2">Confirm Password</h1>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className="w-full h-10 pl-6 dark:bg-gray-700"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        render={(message) => (
                          <div className="text-red-400 mt-2">{message}</div>
                        )}
                      />
                    </div>
                  </>
                )}
                <div className="h-8"></div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-10 dark:bg-green-400 dark:hover:bg-green-300 transition duration-300 dark:text-black text-white bg-green-500 hover:bg-green-400"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <div className="h-8"></div>
                <p className="text-center">
                  {this.state.isLogIn
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <span
                    className="text-green-400 cursor-pointer font-bold"
                    onClick={this.toggleLogin}
                  >
                    {this.state.isLogIn ? "\tSign up" : "\tLog in"}
                  </span>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
