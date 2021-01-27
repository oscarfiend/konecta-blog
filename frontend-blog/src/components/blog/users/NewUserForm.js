import React from "react";
import { Modal } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { useRef } from "react";
import { saveUser } from "../../../helpers/usersHelper";

const NewUserForm = ({users,setUsers,handleClose }) => {
  const { userSelected } = useSelector((state) => state.user);

  // initial values if is updating
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      name: userSelected?.name || "",
      email: userSelected?.email || "",
      phone: userSelected?.phone || "",
      role: userSelected?.role || "Administrador",
      password: userSelected?.password || "",
      password2: "",
    },
  });

  // variables for compare match password
  const password = useRef({});
  password.current = watch("password", "");

  //method for submit the form
  const onSubmit =async (data) => {
    saveUser(userSelected,users,setUsers,data)
    //close the modal window
    handleClose()
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>
          {userSelected ? "Update user" : "Creating a new User"}
        </Modal.Title>
      </Modal.Header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)} className="form-modal">
          <div className="row">
            <div className="col-5">
              <label htmlFor="inputEmail" className="visually-hidden">
                Name
              </label>
              <input
                autoComplete="off"
                name="name"
                ref={register({
                  required: "Name is required",
                  pattern: {
                    value: /^[a-zA-Z\s]{2,254}$/i,
                    message: "The name is not correct",
                  },
                })}
                className="form-control"
                placeholder="Name"
              />
              <p className="text-danger">{errors.name?.message}</p>
            </div>
            <div className="col-7">
              <label htmlFor="inputEmail" className="visually-hidden">
                Email address
              </label>
              <input
                autoComplete="off"
                name="email"
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
                className="form-control"
                placeholder="Email address"
              />
              <p className="text-danger">{errors.email?.message}</p>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="inputEmail" className="visually-hidden">
                Phone
              </label>
              <input
                autoComplete="off"
                name="phone"
                ref={register({
                  required: "Phone is required",
                })}
                className="form-control"
                placeholder="Phone number"
              />
              <p className="text-danger">{errors.phone?.message}</p>
            </div>
            <div className="col">
              <label htmlFor="inputEmail" className="visually-hidden">
                Role
              </label>
              <select
                className="form-select form-control"
                name="role"
                ref={register}
                aria-label="Default select example"
              >
                <option value="Administrador">Administrador</option>
                <option value="Usuario">Usuario</option>
              </select>
            </div>
          </div>
          {userSelected ? null : (
            <div className="row">
              <div className="col">
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
                      message: "Password is obligatory",
                    },
                    minLength: {
                      value: 6,
                      message: "Your password must be at least 6 characters",
                    },
                  })}
                  className="form-control"
                  placeholder="Password"
                />
                <p className="text-danger">{errors.password?.message}</p>
              </div>
              <div className="col">
                <label htmlFor="inputPassword" className="visually-hidden">
                  Repeat the password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="password2"
                  ref={register({
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                  className="form-control"
                  placeholder="Repeat password"
                />
                <p className="text-danger">{errors.password2?.message}</p>
              </div>
            </div>
          )}
          <Modal.Footer>
            <button className="btn btn-outline-secondary" onClick={handleClose}>
              Close
            </button>
            <button type="submit" className="btn btn-outline-danger">
              {userSelected ? "Update Changes" : "Save Changes"}
            </button>
          </Modal.Footer>
        </form>
      </main>
    </div>
  );
};

export default NewUserForm;
