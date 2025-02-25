import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import MainPage from "./component/MainPage";
import ResultPage from "./component/Result";

function App() {
    const [url, setUrl] = useState("");
    const [summarizeText, setSummarizeText] = useState("");
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<MainPage url={url} summarizeText={summarizeText} setUrl={setUrl} setSummarizeText={setSummarizeText} />}
                />
                <Route
                    path="/result"
                    element={
                        <ResultPage
                          url={url}
                          summarizeText={summarizeText}
                        />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
