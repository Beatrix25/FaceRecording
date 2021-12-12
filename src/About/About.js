import React, { Component } from 'react';
import "./About.css";
import AboutImg from "./me.jpg";
import { components } from "react-select";
import ReactDOM from "react-dom";
import makeAnimated from "react-select/animated";
import { colourOptions } from "./data.js";
import MySelect from "./MySelect.js";
import history from './../history';

import Button from 'react-bootstrap/Button';


import '../../node_modules/react-select/dist/react-select.cjs'

const Option = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MultiValue = props => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

const animatedComponents = makeAnimated();
class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null
    };
  }

  handleChange = selected => {
    this.setState({
      optionSelected: selected
    });
  };
  
    render() {
        return (
            

          <div class="container">
           
            <div class="aboutTeacher" >
              <div class="aboutImage"> 
              <div class="image" alt="image"><img src={AboutImg} style={{width:120}}></img></div>
              
             <div class="peopleData">
               <p class="name">Szabó Beatrix</p>
              <p>Informatika</p> 
              <br></br>
              </div>
              
             </div>
              
              <div class="select">
                
              <MySelect
              
        options={colourOptions}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{ Option, MultiValue, animatedComponents }}
        onChange={this.handleChange}
        allowSelectAll={true}
        value={this.state.optionSelected}
      />
      </div>
      
        </div>
      



            </div>
            
              
         
             
           
          
            
        );
    
    }
}

export default About;


