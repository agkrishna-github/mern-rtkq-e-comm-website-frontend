import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useAddNewUserMutation } from "../features/userApiSlice";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [addNewUser, { isLoading, isSuccess, isError, error, data }] =
    useAddNewUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast(data.message);

      formik.resetForm();
      navigate("/login");
    } else if (isError) {
      formik.resetForm();
      toast.error(data.message);
    }
  }, [isSuccess, isError]);

  let schema = yup.object().shape({
    firstName: yup.string().required("First Name is Required"),
    lastName: yup.string().required("Last Name is Required"),
    email: yup
      .string()
      .email("Email should be valid")
      .required("Email is Required"),
    password: yup.string().required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const usernew = await addNewUser(values);
    },
  });
  return (
    <div className="d-flex justify-content-center align-items-center calc-h">
      <div className="shadow" style={{ width: "400px" }}>
        <h5 className="text-center p-2">Register Here</h5>
        <form action="" className="p-3" onSubmit={formik.handleSubmit}>
          <div className="p-3">
            <TextField
              type="text"
              id="First Name"
              label="First Name"
              variant="outlined"
              className="w-100"
              autoComplete="off"
              onChange={formik.handleChange("firstName")}
              onBlur={formik.handleBlur("firstName")}
              value={formik.values.firstName}
            />
          </div>
          <div className="text-danger mt-1 ps-3">
            {formik.touched.firstName && formik.errors.firstName}
          </div>
          <div className="p-3">
            <TextField
              id="Last Name"
              label="Last Name"
              variant="outlined"
              className="w-100"
              autoComplete="off"
              type="text"
              onChange={formik.handleChange("lastName")}
              onBlur={formik.handleBlur("lastName")}
              value={formik.values.lastName}
            />
          </div>
          <div className="text-danger mt-1 ps-3">
            {formik.touched.lastName && formik.errors.lastName}
          </div>
          <div className="p-3">
            <TextField
              id="E-MAIL"
              label="E-MAIL"
              variant="outlined"
              className="w-100"
              autoComplete="off"
              type="email"
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              value={formik.values.email}
            />
          </div>
          <div className="text-danger mt-1 ps-3">
            {formik.touched.email && formik.errors.email}
          </div>
          <div className="p-3">
            <TextField
              id="Password"
              label="Password"
              variant="outlined"
              className="w-100"
              autoComplete="off"
              type="password"
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              value={formik.values.password}
            />
          </div>
          <div className="text-danger mt-1 ps-3">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="p-3">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>

        <p className="ps-3">
          Already User &nbsp;
          <Link to="/login" className="" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
