"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Loader2 } from "lucide-react";
import StatisticsPage from "./StatisticsPage";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
export default function CustomTestList() {
    const { user } = useUser();
    const [customTest, setCustomTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    useEffect(() => {
        const fetchTests = async () => {
            if (user) {
                try {
                    const response = await fetch(`https://server.datasenseai.com/custom-test/submissions/${user.id}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch tests");
                    }
                    const data = await response.json();
                    console.log(data);
                    setCustomTest(data.data); // Updated to access the `data` field
                }
                catch (error) {
                    console.error("Error fetching tests:", error);
                    setError("Failed to load tests. Please try again later.");
                }
                finally {
                    setLoading(false);
                }
            }
        };
        fetchTests();
    }, [user]);
    const handleSubmissionClick = (submission) => {
        setSelectedSubmission(submission);
    };
    if (loading) {
        return (_jsxs("div", { className: "w-full h-screen flex flex-col items-center justify-center", children: [_jsx(Loader2, { className: "w-16 h-16 text-blue-500 animate-spin" }), _jsx("h5", { className: "mt-4 text-2xl font-thin text-gray-700", children: "Loading..." })] }));
    }
    if (error) {
        return (_jsx("div", { className: "container mx-auto p-6 max-w-4xl", children: _jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] }) }));
    }
    if (selectedSubmission) {
        return (_jsx(StatisticsPage, { testId: selectedSubmission._id, results: selectedSubmission.questions, totalTime: selectedSubmission.questions.reduce((total, q) => total + (q.timeTaken || 0), 0) }));
    }
    return (_jsx("div", { className: "container mx-auto p-6 max-w-4xl", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-2xl font-bold", children: "Your Custom Tests" }) }), _jsx(CardContent, { children: _jsx(ScrollArea, { className: "h-[60vh]", children: !customTest || !customTest.submissions || customTest.submissions.length === 0 ? (_jsx("p", { className: "text-center text-gray-500 dark:text-gray-400", children: "No tests found." })) : (customTest.submissions.map((submission, index) => (_jsx(Card, { className: "mb-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors", onClick: () => handleSubmissionClick(submission), children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: submission.subject || `Test ${index + 1}` }), _jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: ["Submitted: ", new Date(submission.submittedAt).toLocaleString()] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "font-medium", children: ["Score: ", submission.questions.filter((q) => q.isCorrect).length, " /", " ", submission.questions.length] }), _jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: ["Time:", " ", (submission.questions.reduce((total, q) => total + (q.timeTaken || 0), 0) / 60).toFixed(2), " ", "minutes"] })] })] }) }) }, submission._id)))) }) })] }) }));
}
