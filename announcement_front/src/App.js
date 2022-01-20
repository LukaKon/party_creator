import React from "react";
import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <h1>React try</h1>
//       <h1>React try</h1>
//       <h1>React try</h1>
//       <h1>React try</h1>
//       <h1>React try</h1>
//       <h1>React try</h1>
//     </div>
//   );
// }

// export default App;

class connectionExample extends React.Component {
  componentDidMount() {
    const apiUrl = "http://127.0.0.1:8000/api/";
    console.log(fetch(apiUrl))
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  render(){
    return <div>Example connection</div>;
  }
}
export default connectionExample;