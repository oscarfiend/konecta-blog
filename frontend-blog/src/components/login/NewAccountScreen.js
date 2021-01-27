import React from "react";
import { useForm } from "react-hook-form";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupAction, clearErrors } from "../../redux/actions/userActions";
import { useEffect } from "react";

const NewAccountScreen = () => {
  const { register, handleSubmit, errors } = useForm();

  const { error, msgError } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    //try do log
    dispatch(signupAction(data));
  };

  useEffect(() => {
    dispatch(clearErrors());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container text-center">
      <img className="mb-4" src="/image003.png" height="140px" alt="" />
      <main className="form-signin">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
          <label htmlFor="name" className="visually-hidden">
            Name:
          </label>
          <input
            name="name"
            ref={register({
              required: "Name is required",
            })}
            className="form-control"
            placeholder="Your name"
          />
          <p className="text-danger">{errors.name?.message}</p>
          <label htmlFor="email" className="visually-hidden">
            Email address
          </label>
          <input
            name="email"
            ref={register({
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            className="form-control"
            placeholder="Email address"
          />
          <p className="text-danger">{errors.email?.message}</p>
          <label htmlFor="phone" className="visually-hidden">
            Phone
          </label>
          <input
            name="phone"
            ref={register({
              required: "Phone is required",
              minLength: {
                value: 6,
                message: "Your phone must be at least 6 characters",
              },
            })}
            className="form-control"
            placeholder="Phone"
          />
          <p className="text-danger">{errors.phone?.message}</p>
          <label htmlFor="inputPassword" className="visually-hidden">
            Password
          </label>
          <input
            type="password"
            autoComplete="off"
            name="password"
            ref={register({
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Your password must be at least 6 characters",
              },
            })}
            className="form-control"
            placeholder="Password"
            required=""
          />
          <p className="text-danger">{errors.password?.message}</p>
          <div className="checkbox mb-3"></div>
          <button className="w-100 btn btn-lg btn-danger" type="submit">
            Sign up
          </button>
          {error && <p className="text-danger">{msgError}</p>}
          <Link className="text-secondary" to="/login">
            I already have an account
          </Link>
          <p className="mt-5 mb-3 text-muted">© Konecta</p>
        </form>
      </main>
    </div>
  );
};

export default NewAccountScreen;
