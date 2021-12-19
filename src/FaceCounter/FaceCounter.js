// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas DONE
// 4. Define references to those DONE
// 5. Load posenet DONE
// 6. Detect function DONE
// 7. Drawing utilities from tensorflow DONE
// 8. Draw functions DONE

import React, { useRef, useEffect, Component } from "react";
import "./FaceCounter.css";
import * as tf from "@tensorflow/tfjs";

// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh, drawPath } from "./utilities";
import Button from "react-bootstrap/Button";
import history from "../history";
import "./About.css";
import AboutImg from "./me.jpg";
import { components } from "react-select";
import makeAnimated from "react-select/animated";
import MySelect from "./MySelect.js";
import Axios from "axios";

import "react-select";
var faces = 0;
var selectedID;
var dropDownData;
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
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );
    //  setInterval(() => {
    detect(net);
    //  }, 1000);
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
      
      const face = await net.estimateFaces({ input: video });
      
      // Get canvas context

      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => {
        drawMesh(face, ctx);
      });
      faces = drawMesh(face, ctx);
    }
  };

  const sendFaces = async () => {
    runFacemesh();
    console.log(faces, "Faces");
    return null;
  };

  useEffect(async () => {
    runFacemesh();
  }, []);

  return (
    <div className="Product">
      <header className="Product-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "26%",
            marginRight: "auto",
            marginTop: "-2%",
            left: 0,
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
            marginLeft: "27%",
            marginRight: "auto",
            marginTop: "-2%",
            marginBottom: "-20%",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>

      <Button 
        type="submit"
        onClick={sendFaces}
        variant="default"
        style={{ color: "white", background: "#19588C", marginTop: "-10%" }}
      >
        Számlálás
      </Button>

     
    </div>
  );
}

const animatedComponents = makeAnimated();
var subject = [];
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null,
      data: null,
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:3001/subjects").then((response) => {
      const data = response.data.data.result;
      data.map((subjectData) => {
        subject.push({
          value: subjectData.identifier,
          label: subjectData.name,
          color: "111",
          id: subjectData.id,
        });
      });
      console.log(data, "Subjects");
      this.setState({ data });
    });
  }

  handleChange = async (selected) => {
    this.setState({
      optionSelected: selected,
     
    });
    window.location.href="/Tables"
  };

  sendData2 = (value) => {
    console.log(faces, "Faces2", value);
    const remove = JSON.stringify(value);
    const removed = `${remove.slice(remove.length - 3, remove.length - 2)}`;

    Axios.post("http://localhost:3001/addpresence", {
      num_of_student: faces,
      subject_id: removed,
    }).then((response) => {
      console.log("success");
      
    });
    
  };

  render() {
    return (
      <div class="container">
        <div class="aboutTeacher">
          <div class="aboutImage">
            <div class="image" alt="image">
              <img src={AboutImg} style={{ width: 120 }}></img>
            </div>

            <div class="peopleData">
              <p class="name">Szabó Beatrix</p>
              <p>Informatika</p>
              {console.log(subject, "data")}
              <br></br>
            </div>
          </div>

          <div>
            <div>
              <Product></Product>
            </div>
            <div class="select">
              <MySelect
              
                options={subject}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{ Option, MultiValue, animatedComponents }}
                onChange={this.handleChange}
                allowSelectAll={false}
                value={this.sendData2(this.state.optionSelected)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
