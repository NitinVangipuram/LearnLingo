import React from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { register } from "../../../api/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Register = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const onFinish = async (values) => {
    try {
      console.log(values);
      values.isadmin = admin;
      const response = await register(values);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col w-400 p-3">
        <div className="flex flex-col">
          <h1 className="text-2xl">Register</h1>
          <div class="checkbox-wrapper-49">
  <div class="checkbox-wrapper-34 flex-admin">
  <span > Are you Admin </span>
  
  <input class='tgl tgl-ios' id='toggle-34' type='checkbox' onClick={()=>{
            setAdmin(!admin)
          }}></input>
  <label class='tgl-btn' for='toggle-34'></label>

</div>

</div>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Name">
              <input type="text" />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <input type="text" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" />
            </Form.Item>
            <div className="flex flex-col gap-1">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Register
              </button>
              <Link to="/login">Already a member? Login</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
