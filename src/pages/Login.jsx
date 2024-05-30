import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../features/authApiSlice";
import { setCredentials } from "../features/authSlice";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { isLoading, isSuccess, isError, error, data }] =
    useLoginUserMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      toast(`User ${data.user} logged in successfully`);
      dispatch(setCredentials(data));

      formik.resetForm();
      navigate("/");
    } else if (isError) {
      formik.resetForm();
      // console.log(data);
      toast.error(data.message);
    }
  }, [isSuccess, isError]);

  let schema = yup.object().shape({
    email: yup
      .string()
      .email("Email should be valid")
      .required("Email is Required"),
    password: yup.string().required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const loginUserData = await loginUser(values);
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center calc-h">
      <div className="h-75 shadow" style={{ width: "400px" }}>
        <h5 className="text-center p-3 ">Login</h5>
        <form action="" className=" p-3" onSubmit={formik.handleSubmit}>
          <div className="p-3">
            <TextField
              id="E-MAIL ID"
              label="E-MAIL ID"
              variant="outlined"
              className="w-100"
              autoComplete="off"
              type="email"
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              value={formik.values.email}
            />
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
          <div className="p-3">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
        <div className="p-3">
          <p>
            New User &nbsp;
            <Link
              to="/register"
              className=""
              style={{ textDecoration: "none" }}
            >
              Register Here
            </Link>
          </p>
          <div>
            <Link to="/">
              <button>Count</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
