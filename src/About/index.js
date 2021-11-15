// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import makeAnimated from "react-select/animated";
// import { colourOptions } from "./data.js";
// import MySelect from "./MySelect.js";
// import "./About.css";
// import { components } from "react-select";
// import { dropdownIndicatorCSS } from "react-select/dist/declarations/src/components/indicators";

// const Option = props => {
//   return (
//     <div>
//       <components.Option {...props}>
//         <input
//           type="checkbox"
//           checked={props.isSelected}
//           onChange={() => null}
//         />{" "}
//         <label>{props.label}</label>
//       </components.Option>
//     </div>
//   );
// };

// const MultiValue = props => (
//   <components.MultiValue {...props}>
//     <span>{props.data.label}</span>
//   </components.MultiValue>
// );

// const animatedComponents = makeAnimated();
// export default class Example extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       optionSelected: null
//     };
//   }

//   handleChange = selected => {
//     this.setState({
//       optionSelected: selected
//     });
//   };

//   render() {
//     return (
//       <MySelect
//         options={colourOptions}
//         isMulti
//         closeMenuOnSelect={false}
//         hideSelectedOptions={false}
//         components={{ Option, MultiValue, animatedComponents }}
//         onChange={this.handleChange}
//         allowSelectAll={true}
//         value={this.state.optionSelected}
//       />
//     );
//   }
// }
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Example />, rootElement);
