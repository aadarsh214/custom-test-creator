import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const [formData, setFormData] = useState({
        questionPool: 'free',
        includeAttempted: false,
        numQuestions: 10,
        topic: '',
        questionType: '',
        subtopic: '',
        difficulty: '',
        timePerQuestion: 5,
    });
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            let response;
            if (formData.questionType === 'coding') {
                response = await fetch(`https://server.datasenseai.com/test-series-coding/custom-questions?topic=${formData.topic}&type=${formData.questionType}&difficulty=${formData.difficulty}&numQuestions=${formData.numQuestions}`);
            }
            else {
                response = await fetch(`https://server.datasenseai.com/test-series-mcq/custom-questions?topic=${formData.topic}&type=${formData.questionType}&difficulty=${formData.difficulty}&numQuestions=${formData.numQuestions}`);
            }
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }
            const data = await response.json();
            setQuestions(data);
            setShowQuiz(true); // Show QuizApp when questions are received
            //  console.log(data);
            // Store questions in sessionStorage to access them in the new tab
            sessionStorage.setItem('quizQuestions', JSON.stringify(data));
            sessionStorage.setItem('timePerQuestion', formData.timePerQuestion.toString());
            if (formData.questionType === 'mcq') {
                sessionStorage.setItem('subject', formData.topic);
            }
            // Option 1: Open in new tab
            if (formData.topic === 'sql' && formData.questionType === 'coding') {
                const newWindow = window.open('/quiz', '_blank');
                if (newWindow)
                    newWindow.focus();
            }
            else if (formData.topic === 'python' && formData.questionType === 'coding') {
                const newWindow = window.open('/python-coding-quiz', '_blank');
                if (newWindow)
                    newWindow.focus();
            }
            else {
                const newWindow = window.open('/mcq-quiz', '_blank');
                if (newWindow)
                    newWindow.focus();
            }
            // Navigate to QuizApp full screen with questions
            // navigate('/sql-coderpad', { state: { questions: data } });
        }
        catch (err) {
            setError('An error occurred while fetching questions. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    // if (showQuiz && questions.length > 0) {
    //   return <QuizApp questions={questions} />;
    // }
    return (_jsx("div", { className: "mx-auto max-w", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Create Custom Test" }), _jsx(CardDescription, { children: "Configure your test settings below" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "questionPool", children: "Question Pool" }), _jsxs(Select, { value: formData.questionPool, onValueChange: (value) => setFormData({ ...formData, questionPool: value }), children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select pool" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "free", children: "Free" }), _jsx(SelectItem, { value: "premium", children: "Premium" })] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "includeAttempted", children: "Include Attempted Questions" }), _jsx(Switch, { id: "includeAttempted", checked: formData.includeAttempted, onCheckedChange: (checked) => setFormData({ ...formData, includeAttempted: checked }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { children: ["Number of Questions: ", formData.numQuestions] }), _jsx(Slider, { value: [formData.numQuestions], onValueChange: ([value]) => setFormData({ ...formData, numQuestions: value }), min: 5, max: 50, step: 5 })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "topic", children: "Topic" }), _jsxs(Select, { value: formData.topic, onValueChange: (value) => setFormData({ ...formData, topic: value }), children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select topic" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "sql", children: "SQL" }), _jsx(SelectItem, { value: "python", children: "Python" })] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "questionType", children: "Question Type" }), _jsxs(Select, { value: formData.questionType, onValueChange: (value) => setFormData({ ...formData, questionType: value }), children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "coding", children: "Coding" }), _jsx(SelectItem, { value: "mcq", children: "MCQ" })] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "difficulty", children: "Difficulty" }), _jsxs(Select, { value: formData.difficulty, onValueChange: (value) => setFormData({ ...formData, difficulty: value }), children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select difficulty" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "easy", children: "Basic" }), _jsx(SelectItem, { value: "medium", children: "Intermediate" }), _jsx(SelectItem, { value: "advance", children: "Advanced" }), _jsx(SelectItem, { value: "mixed", children: "Mixed" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { children: ["Time per Question (minutes): ", formData.timePerQuestion] }), _jsx(Slider, { value: [formData.timePerQuestion], onValueChange: ([value]) => setFormData({ ...formData, timePerQuestion: value }), min: 1, max: 15, step: 1 })] })] }), _jsx("div", { className: "flex items-center justify-center", children: _jsxs(Button, { type: "submit", className: "w-1/3", disabled: loading, children: [loading ? _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : null, loading ? 'Loading...' : 'Create Test'] }) })] }) })] }) }));
};
export default HomePage;
