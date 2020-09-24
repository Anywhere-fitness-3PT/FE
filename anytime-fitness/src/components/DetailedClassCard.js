import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const DetailedClasses = (props) => {
  const [classDetail, setClassDetail] = useState("");
  const params = useParams();
  const { push } = useHistory();

  useEffect(() => {
    const [filter] = props.classes.filter(
      (classObj) => classObj.id == params.id
    );
    setClassDetail(filter);
  }, [params.id]);

  if (!classDetail) {
    return <div>Loading class information...</div>;
  }

  const deleteClass = (e) => {
    e.preventDefault();
    axiosWithAuth(props.token)
      .delete(`classes/${params.id}`)
      .then((res) => {
        console.log(res);
        push("/classes");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="classDetails">
      <h2>{classDetail.name}</h2>
      <img src={classDetail.imgUrl} width={300}></img>
      <div>
        <p>Time: {classDetail.time}</p>
      </div>
      <div>
        <p>Class Description: {classDetail.courseDescription}</p>
      </div>
      <div>
        <p>Location: {classDetail.address}</p>
      </div>
      <div>
        <p>Class starting: {classDetail.startDate}</p>
      </div>
      <div>
        <p>Cost of class: ${classDetail.cost}</p>
      </div>
      <div>
        <p>Duration: {classDetail.duration}</p>
      </div>
      <div>
        <p>Fitness level: {classDetail.intensity}</p>
      </div>
      <div>
        <p>Class capacity: {classDetail.maxSize}</p>
      </div>
      <div>
        <p>Equipment needed: {classDetail.equiptmentRequired}</p>
      </div>
      <div>
        <p>Upon arrival: {classDetail.arrivalDescription}</p>
      </div>
      <div>
        <p>Additional Info: {classDetail.additionalInfo}</p>
      </div>
      <div>
        <p>
          Days:{" "}
          {classDetail.days.map((day) => (
            <span>{day} </span>
          ))}
        </p>
      </div>
      <div className='links'>
      <button onclick={() => push("/classes")}>Back to class list</button>
      {props.role === "instructor" ? (
        <>
          <button 
            className='delete-btn' 
            onClick={deleteClass}>
              Delete Class
          </button>
          <button 
            className='edit-btn' 
            onClick={() => push(`/edit-class/${params.id}`)}>
            Edit Class
          </button>
        </>
      ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    classes: state.classes.classes,
    token: state.login.token,
    role: state.login.role,
  };
};

export default connect(mapStateToProps, null)(DetailedClasses);
