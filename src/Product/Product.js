// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas DONE
// 4. Define references to those DONE
// 5. Load posenet DONE
// 6. Detect function DONE
// 7. Drawing utilities from tensorflow DONE
// 8. Draw functions DONE

// Face Mesh - https://github.com/tensorflow/tfjs-models/tree/master/facemesh

import React, { useRef, useEffect, Component } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh, drawPath } from "./utilities";
import Button from 'react-bootstrap/Button';
import history from './../history';
import "./About.css";
import AboutImg from "./me.jpg";
import { components } from "react-select";
import ReactDOM, { render } from "react-dom";
import makeAnimated from "react-select/animated";
import { colourOptions } from "./data.js";
import MySelect from "./MySelect.js";


import "../../node_modules/react-select/dist/react-select.cjs";


const Option = (props) => {
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

const MultiValue = (props) => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);
function Product() {

 

 const webcamRef = useRef(null);
 const canvasRef = useRef(null);

 //  Load posenet
 const runFacemesh = async () => {
   // OLD MODEL
   // const net = await facemesh.load({
   //   inputResolution: { width: 640, height: 480 },
   //   scale: 0.8,
   // });
   // NEW MODEL
   const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
   setInterval(() => {
     detect(net);
   }, 10);
 };

 const detect = async (net) => {
   if (
     typeof webcamRef.current !== "undefined" &&
     webcamRef.current !== null &&
     webcamRef.current.video.readyState === 4
   ) {
     // Get Video Properties
     const video = webcamRef.current.video;
     const videoWidth = webcamRef.current.video.videoWidth;
     const videoHeight = webcamRef.current.video.videoHeight;

     // Set video width
     webcamRef.current.video.width = videoWidth;
     webcamRef.current.video.height = videoHeight;

     // Set canvas width
     canvasRef.current.width = videoWidth;
     canvasRef.current.height = videoHeight;

     // Make Detections
     // OLD MODEL
     //       const face = await net.estimateFaces(video);
     // NEW MODEL
     const face = await net.estimateFaces({input:video});
     // console.log(face, "face");
     // Get canvas context
     
     const ctx = canvasRef.current.getContext("2d");
     requestAnimationFrame(()=>{drawMesh(face, ctx)});
   }
 };

 useEffect(()=>{runFacemesh()}, []);
 
 return (
  
   <div className="Product">
     <header className="Product-header">
       <Webcam
         ref={webcamRef}
         style={{
           position: "absolute",
           marginLeft: "26%",
           marginRight: "auto",
          marginTop:"-7%",
           left:0,
           right: 0,
           textAlign: "center",
           zindex: 9,
           width: 680,
           height: 480,
         }}
       />

       <canvas
         ref={canvasRef}
         style={{
           position: "absolute",
           marginLeft: "28%",
           marginRight: "auto",
           marginTop:"-6.5%",
           left: 0,
           right: 0,
           textAlign: "center",
           zindex: 9,
           width: 640,
           height: 480,
         
         }}
       />

       
     
     </header>
</div>)}

const animatedComponents = makeAnimated();
class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null,
    };
  }

  handleChange = (selected) => {
    this.setState({
      optionSelected: selected,
    });
  };

render() {
  return ( 

      <div class="container">
        <div class="aboutTeacher">
          <div class="aboutImage">
            <div class="image" alt="image">
              <img src={AboutImg} style={{ width: 120} }></img>
            </div>

            <div class="peopleData">
              <p class="name">Szabó Beatrix</p>
              <p>Informatika</p>
              <br></br>
            </div>
          </div>
         
          <div >
          <div>
          <Product></Product>
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
          </div></div>
          <div class="button">
            <Button type="submit" onClick={() => history.push("Contact/Contact.js")}>
              Számlálás indítása
            </Button>
          </div>

        </div>
        
      </div>
  );

}}

export default About;