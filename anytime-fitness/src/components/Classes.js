import React, { useEffect } from "react";
import { connect } from "react-redux";
import { classesFetch } from "../store/actions";
import { Link } from "react-router-dom";

const Classes = (props) => {
  useEffect(() => {
     console.log('useEffect hook')
    props.classesFetch(props.token);
     console.log(props.classes)
  }, [props.token]);
   console.log(props.classes)
  return (
    <div className="classContainer">
      <h2 className="title">Classes</h2>
      <div className="cardContainer">
        {props.classes.length ? (
          props.classes.map((classObj) => (
            <div className="class-card" key={classObj.id}>
              <h2>{classObj.name}</h2>
              <div>
                <p>Time: {classObj.time}</p>
              </div>
              <div>
                <p>Class Description: {classObj.courseDescription}</p>
              </div>
              <div>
                <p>Location: {classObj.address}</p>
              </div>
              <div>
                <p>Class starting: {classObj.startDate}</p>
              </div>
              <Link to={`class-details/${classObj.id}`}>Class Details</Link>
            </div>
          ))
        ) : (
          <p className="login">Login to view classes</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    classes: state.classes.classes,
  };
};
export default connect(mapStateToProps, { classesFetch })(Classes);
