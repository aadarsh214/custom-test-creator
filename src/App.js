import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import StatisticsPage from './components/StatisticsPage';
import PaymentPage from './components/PaymentPage';
import LeaderboardPage from './components/LeaderboardPage';
import History from './components/History';
import QuizApp from './components/QuizApp';
import PythonQuizApp from './components/PythonQuizApp';
import Quiz from './components/Quiz.jsx';
const QuizWrapper = () => {
    const [questions, setQuestions] = React.useState([]);
    const [timer, setTimer] = React.useState(0);
    React.useEffect(() => {
        const storedQuestions = sessionStorage.getItem('quizQuestions');
        const timePerQuestion = sessionStorage.getItem('timePerQuestion');
        const time = parseInt(timePerQuestion || "0", 10);
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
            setTimer(time);
            // Optional: Clear the storage after retrieving
            sessionStorage.removeItem('quizQuestions');
            sessionStorage.removeItem('timePerQuestion');
        }
    }, []);
    return questions.length > 0 ? (_jsx("div", { className: "min-h-screen w-full", children: _jsx(QuizApp, { questions: questions, timePerQuestion: timer }) })) : (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("p", { children: "No questions found. Please start a new quiz from the home page." }) }));
};
const PythonQuizWrapper = () => {
    const [questions, setQuestions] = React.useState([]);
    const [timer, setTimer] = React.useState(0);
    React.useEffect(() => {
        const storedQuestions = sessionStorage.getItem('quizQuestions');
        const timePerQuestion = sessionStorage.getItem('timePerQuestion');
        const time = parseInt(timePerQuestion || "0", 10);
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
            setTimer(time);
            // Optional: Clear the storage after retrieving
            sessionStorage.removeItem('quizQuestions');
            sessionStorage.removeItem('timePerQuestion');
        }
    }, []);
    return questions.length > 0 ? (_jsx("div", { className: "min-h-screen w-full", children: _jsx(PythonQuizApp, { questions: questions, timePerQuestion: timer }) })) : (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("p", { children: "No questions found. Please start a new quiz from the home page." }) }));
};
const MCQQuizWrapper = () => {
    const [questions, setQuestions] = React.useState([]);
    const [timer, setTimer] = React.useState(0);
    const [subject, setSubject] = React.useState('');
    React.useEffect(() => {
        const storedQuestions = sessionStorage.getItem('quizQuestions');
        const timePerQuestion = sessionStorage.getItem('timePerQuestion');
        const time = parseInt(timePerQuestion || "0", 10);
        const subject = sessionStorage.getItem('subject') || '';
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
            setTimer(time);
            setSubject(subject);
            // Optional: Clear the storage after retrieving
            sessionStorage.removeItem('quizQuestions');
            sessionStorage.removeItem('timePerQuestion');
            sessionStorage.removeItem('subject');
        }
    }, []);
    return questions.length > 0 ? (_jsx("div", { className: "min-h-screen w-full", children: _jsx(Quiz, { questions: questions, timePerQuestion: timer, subject: subject }) })) : (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("p", { children: "No questions found. Please start a new quiz from the home page." }) }));
};
const App = () => {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/quiz", element: _jsx(QuizWrapper, {}) }), _jsx(Route, { path: "/python-coding-quiz", element: _jsx(PythonQuizWrapper, {}) }), _jsx(Route, { path: "/mcq-quiz", element: _jsx(MCQQuizWrapper, {}) }), _jsx(Route, { path: "/*", element: _jsx(Layout, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/statistics/:testId", element: _jsx(StatisticsPage, { testId: "1", results: [], totalTime: 0 }) }), _jsx(Route, { path: "/payment", element: _jsx(PaymentPage, {}) }), _jsx(Route, { path: "/leaderboard", element: _jsx(LeaderboardPage, {}) }), _jsx(Route, { path: "/history", element: _jsx(History, {}) })] }) }) })] }) }));
};
export default App;
