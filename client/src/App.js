import React, { Component } from 'react';
import axios from "axios";

class App extends Component {
    // initialize our state 
    state = {
      data: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null
    };
  
  render() {
    return (
      <div className="App">
        I'M READY TO THE BACK!
      </div>
    );
  }
}

export default App;
