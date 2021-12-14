import React, { useEffect, useContext,createContext, useState, useCallback , Component } from "react";
import { useHistory } from "react-router-dom";
import Axios from 'axios';
var presence =[];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    Axios.get('http://localhost:3001/presence')
      .then(response => {
      const data = response.data.data.result
      presence = data;
      this.setState({ data })}
      )
  }

  render (){
    return(
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Name</th>
            <th scope="col">Max student</th>
            <th scope="col">Num of Student</th>
            <th scope="col">Professor</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {  presence.map((presenceData) => {
              return (
                <tr>
                  <td>{presenceData.name}</td>
                  <td>{presenceData.num_of_max_student}</td>
                  <td>{presenceData.num_of_student}</td>
                  <td>{presenceData.profesor}</td>
                  <td>{presenceData.date}</td>
                </tr>
              );
            })} 
        </tbody>
      </table>
    </div>
    )
}
};

export default App;