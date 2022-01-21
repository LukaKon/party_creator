import React, { useEffect, useState } from "react";
import "./App.css";
import Announcements from "./components/Announcements";
import AnnouncementLoadingComponent from "./components/AnnouncementLoading";

function App() {
  const AnnouncementLoading = AnnouncementLoadingComponent(Announcements);
  const [appState, setAppState] = useState({
    loading: false,
    announcements: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = "http://127.0.0.1:8000/api/";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((announcements) => {
        setAppState({ loading: false, announcements: announcements });
      });
  }, [setAppState]);
  return (
    <div className="App">
      <h1>ANNOUNCEMENT</h1>
      <AnnouncementLoading
        isLoading={appState.loading}
        announcements={appState.announcements}
      />
    </div>
  );
}

export default App;

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

// class connectionExample extends React.Component {
//   componentDidMount() {
//     const apiUrl = "http://127.0.0.1:8000/api/";
//     console.log(fetch(apiUrl));
//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//   }
//   render() {
//     return <div>Example connection</div>;
//   }
// }
// export default connectionExample;
