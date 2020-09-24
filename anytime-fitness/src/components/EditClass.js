import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

const EditClass = (props) => {
  const [editClass, setEditClass] = useState({});
  const params = useParams();
  const { push } = useHistory();

  useEffect(()=>{
    const [ filter ] = props.classes.filter(classObj => classObj.id == params.id)
    delete filter.instructor;
    delete filter.days;
    // console.log(filter)
    setEditClass(filter) 
  }, [params.id])

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'duration' || e.target.name === 'cost') {
        value = parseFloat(value)
    }
    if (   e.target.name === 'maxSize' 
        || e.target.name === 'classType' 
        || e.target.name === 'imgUrl') {
        value = parseInt(value)
    }
    if ( e.target.name === 'days'){
        value = value.trim()
        value = value.split(',')
    }
    setEditClass({
      ...editClass,
      [e.target.name]: value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    axiosWithAuth(props.token)
      .put(`classes/${params.id}`, editClass)
      .then((res) => {
        console.log(res)
        push('/classes')
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <div className="createContainer">
      <h3>Edit Class</h3>
      <form onSubmit={submit}>
        <label htmlFor="name">
          Class Name
          <input
            id="name"
            type="text"
            name="name"
            value={editClass.name}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="time">
          Class Time
          <input
            id="time"
            type='text'
            name="time"
            value={editClass.time}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="duration">
          Class Duration
          <input
            id="duration"
            type="number"
            name="duration"
            value={editClass.duration}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="intensity">
          Class intensity level
          <select
            id="intensity"
            name="intensity"
            onChange={handleChange}
          >
            <option value='Beginner'>Beginner</option>
            <option value='Intermediate'>Intermediate</option>
            <option value='Expert'>Expert</option>
          </select>
        </label>

        <label htmlFor="location">
          Class Location
          <input
            id="location"
            name="location"
            type='text'
            value={editClass.location}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="maxSize">
          Maximum class size
          <input
            id="maxSize"
            type="number"
            name="maxSize"
            value={editClass.maxSize}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="classType">
          Class Type
          <select
            id="classType"
            name="classType"
            onChange={handleChange}
          >
            <option value={1}>Yoga</option>
            <option value={2}>Pilates</option>
            <option value={3}>Kickboxing</option>
            <option value={4}>Bootcamp</option>
          </select>
        </label>

        <label htmlFor="imgUrl">
          Img Selection
          <select
            id="imgUrl"
            name="imgUrl"
            onChange={handleChange}
          >
            <option value={1}>Yoga</option>
            <option value={2}>Pilates</option>
            <option value={3}>Kickboxing</option>
            <option value={4}>Bootcamp</option>
          </select>
        </label>

        <label htmlFor='equipmentRequired'>
          Equipment Required 
          <input 
            id="equipmentRequired"
            type="text"
            name="equipmentRequired"
            value={editClass.equipmentRequired}
            onChange={handleChange}
          />
        </label>

        <label htmlFor='arrivalDescription'>
          Arrival Description
          <textarea 
            id="arrivalDescription"
            type="text"
            name="arrivalDescription"
            value={editClass.arrivalDescription}
            onChange={handleChange}
          />
        </label>

        <label htmlFor='additionalInfo'>
          Additional Info 
          <input 
            id="additionalInfo"
            type="text"
            name="additionalInfo"
            value={editClass.additionalInfo}
            onChange={handleChange}
          />
        </label>

        <label htmlFor='cost'>
          Cost
          <input
            id="cost"
            type="number"
            name="cost"
            value={editClass.cost}
            onChange={handleChange}
          />
        </label>

        <label htmlFor='courseDescription'>
          Course Description 
          <input 
            id="courseDescription"
            type="text"
            name="courseDescription"
            value={editClass.courseDescription}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="address">
          Class address
          <input
            id="address"
            type="text"
            name="address"
            value={editClass.address}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="startDate">
          Start Date
          <input
            id="startDate"
            type="text"
            name="startDate"
            value={editClass.startDate}
            onChange={handleChange}
          />
        </label>

        <button>Submit</button> 
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
      token: state.login.token,
      user: state.login.user,
      classes: state.classes.classes
  }
}

export default connect( mapStateToProps, null )( EditClass );