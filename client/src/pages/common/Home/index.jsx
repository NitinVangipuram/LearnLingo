import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { getAllExams } from "../../../api/exam";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [exam, setExam] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getExams = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllExams();
      dispatch(hideLoading());
      if (response.success) {
        setExam(response.data);
        message.success(response.message);
      } else {
        message.error(response.error);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getExams();
  }, []);
  return (
    <div>
      <PageTitle  className="user-intro" title={`Hi ${user?.name},Welcome to LearnLingo `} />
      <div className="cardes">
        {exam.map((exams) => (
          <div  span={5}  className = "carde" key={exams._id}>
            <div className="card card-lg flex flex-col gap-1">
              <h1 className="text-2xl quiz-heading">
                <b>{exams?.name}</b>
              </h1>
              <h1 className="text-md">Category:{exams.category}</h1>
              <h1 className="text-md">Total Marks:{exams.totalMarks}</h1>
              <button
                className="primary-outlined-btn"
                onClick={() => navigate(`/users/write-exam/${exams._id}`)}
              >
                Start Exam
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
