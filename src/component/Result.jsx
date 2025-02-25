import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"
export default function ResultPage({ url, summarizeText }) {
    const [data, setData] = useState([]);
    const [summary, setSummary] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    console.log("url: ", url);
    console.log("summarizeText: ", summarizeText);
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        try {
            const response = await fetch(
                `http://localhost:3000/scrape-ai?limit=5&page=${page}&url=${url}&summarize=${summarizeText}`
            );
            const result = await response.json();
            setData(result.data || []);
            setSummary(result.summarize || "");
            setTotalPages(result.totalPages || 1);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-6 mb-5 px-6">
            <h1 className="text-4xl font-extrabold text-center text-black font-serif tracking-wide">
                E-Commerce Scraper
            </h1>

            {/* Table */}
            <div className="w-full max-w-5xl overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead>
                    <tr className="bg-gray-200 text-gray-800">
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Original Price</th>
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border">Ratings</th>
                        <th className="p-2 border">Product Image</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="text-center border">
                            <td className="p-2 border">{item.price}</td>
                            <td className="p-2 border">{item.originalPrice}</td>
                            <td className="p-2 border">{item.title}</td>
                            <td className="p-2 border">{item.rating}</td>
                            <td className="p-2 border">
                                <img src={item.imageUrl} alt="Product" className="w-12 h-12 object-cover mx-auto" />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex space-x-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Summary Section */}
            <div className="w-full max-w-4xl p-4 border rounded bg-gray-100 text-gray-800">
                <h2 className="text-xl font-bold mb-2">Analysis Summary</h2>
                <div className="prose max-w-none">
                    <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
