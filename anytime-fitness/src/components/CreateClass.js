import React, { useState } from "react";
import { connect } from 'react-redux';
import { createFetch } from '../store/actions';
import { useHistory } from 'react-router-dom';
//import { axiosWithAuth } from "../utils/axiosWithAuth";

const CreateClass = (props) => {
  const { push } = useHistory();
  const [createClass, setCreateClass] = useState({
    name: "",
    time: "",
    duration: "", // float
    intensity: "",
    location: "",
    maxSize: "", //int
    classType: "", // id from database
    imgUrl: "", // selected id from database
    equipmentRequired: "",
    arrivalDescription: "",
    additionalInfo: "",
    cost: "", // float
    courseDescription: "",
    address: "",
    startDate: "",
    instructor: props.user.id, // instructor id
    days: [], // array of day strings
  });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "duration" || e.target.name === "cost") {
      value = parseFloat(value);
    }
    if (
      e.target.name === "maxSize" ||
      e.target.name === "classType" ||
      e.target.name === "imgUrl"
    ) {
      value = parseInt(value);
    }
    if (e.target.name === "days") {
      value = value.trim();
      value = value.split(",");
    }
    setCreateClass({
      ...createClass,
      [e.target.name]: value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    props.createFetch(props.token, createClass)
    if (!props.isFetching){
      push('/classes')
    }
  };

  return (
    <div className="createContainer">
      <h3>Create a class</h3>
      <form onSubmit={submit}>
        <label htmlFor="name">
          Class Name
          <input
            id="name"
            type="text"
            name="name"
            value={createClass.name}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="time">
          Class Time
          <input
            id="time"
            type="datetime-local"
            name="time"
            value={createClass.time}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="duration">
          Class Duration in hours
          <input
            id="duration"
            type="number"
            name="duration"
            value={createClass.duration}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="intensity">
          Class intensity level
          <select
            id="intensity"
            name="intensity"
            onChange={handleChange}
            required
          >
            <option></option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </label>

        <label htmlFor="location">
          Class Location
          <input
            id="location"
            name="location"
            type="text"
            value={createClass.location}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="maxSize">
          Maximum number of participants
          <input
            id="maxSize"
            type="number"
            name="maxSize"
            value={createClass.maxSize}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="classType">
          Class Type
          <select
            id="classType"
            name="classType"
            onChange={handleChange}
            required
          >
            <option></option>
            <option value={1}>Pilates</option>
            <option value={2}>Boxing</option>
            <option value={3}>Running</option>
            <option value={4}>Lifting</option>
            <option value={5}>Hot Yoga</option>
          </select>
        </label>

        <label htmlFor="imgUrl">
          Choose an image
          <select id="imgUrl" name="imgUrl" onChange={handleChange} required>
            <option></option>
            <option value={1}>Pilates</option>
            <option value={2}>Boxing</option>
            <option value={3}>Running</option>
            <option value={4}>Lifting</option>
            <option value={5}>Hot Yoga</option>
          </select>
        </label>

        <label htmlFor="equipmentRequired">
          Equipment Required
          <input
            id="equipmentRequired"
            type="text"
            name="equipmentRequired"
            value={createClass.equipmentRequired}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="arrivalDescription">
          Arrival Description
          <textarea
            id="arrivalDescription"
            type="text"
            name="arrivalDescription"
            value={createClass.arrivalDescription}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="additionalInfo">
          Additional Info
          <input
            id="additionalInfo"
            type="text"
            name="additionalInfo"
            value={createClass.additionalInfo}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="cost">
          Cost
          <input
            id="cost"
            type="number"
            name="cost"
            value={createClass.cost}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="courseDescription">
          Course Description
          <input
            id="courseDescription"
            type="text"
            name="courseDescription"
            value={createClass.courseDescription}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="address">
          Class address
          <input
            id="address"
            type="text"
            name="address"
            value={createClass.address}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="startDate">
          Start Date - Required Format mm-dd-yyyy
          <input
            id="startDate"
            type="text"
            name="startDate"
            required
            pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-[0-9]{4}"
            value={createClass.startDate}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="days">
          Enter days of the week
          <input
            id="days"
            type="text"
            name="days"
            value={createClass.days}
            onChange={handleChange}
            required
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
      token: state.login.token,
      role: state.login.role,
      user: state.login.user,
      isFetching: state.create.isFetching
  }
}

export default connect( mapStateToProps, { createFetch } )( CreateClass );