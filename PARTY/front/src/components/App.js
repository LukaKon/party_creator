import {Footer} from "./Footer";
import {Header} from "./Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage} from "./HomePage";
import {SignIn} from "./SignIn"
import {SignUp} from "./SignUp";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="example" element={<div>example</div>}/>
                    <Route path="signin" element={<SignIn/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="/" element={<HomePage/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
