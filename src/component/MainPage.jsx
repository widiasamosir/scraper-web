import {useNavigate} from "react-router-dom";

export default function MainPage({url, summarizeText, setUrl, setSummarizeText}) {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center space-y-6 mb-5">
            <h1 className="text-4xl font-extrabold text-center text-black font-serif tracking-wide">
                E-Commerce Scrapper
            </h1>
            <div className="mb-6 flex flex-row w-full justify-center items-center">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value);
                    }}
                    placeholder="Put the URL here....."
                    className="p-2 border-2 border-gray-300 rounded-lg w-1/4 "
                    maxLength={500}
                />
            </div>
            <div className="mb-6 flex flex-row w-full justify-center items-center">
                <textarea
                    value={summarizeText}
                    onChange={(e) => {
                        setSummarizeText(e.target.value);
                    }}
                    placeholder="What you want to analyze?"
                    className="w-1/4 min-h-40 p-2 border-2 border-gray-300 rounded-lg"
                    maxLength={200}
                    rows={4}

                />
            </div>

            <button
                onClick={() => navigate("/result")}
                className="px-8 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
                Search ✨
            </button>
        </div>

    );
}