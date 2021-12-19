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
            <th scope="col">Név</th>
            <th scope="col">Max. létszám</th>
            <th scope="col">Résztvevők száma</th>
            <th scope="col">Tanár</th>
            <th scope="col">Dátum</th>
          </tr>
        </thead>
        <tbody>
          {  presence.map((presenceData) => {
              return (
                <tr>
                  <td>{presenceData.name}</td>
                  <td>{presenceData.num_of_max_student}</td>
                  <td>{presenceData.num_of_student}</td>
                  <td>{presenceData.professor}</td>
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