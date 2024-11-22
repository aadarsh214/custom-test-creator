import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Pie, PieChart, Cell } from 'recharts';
import { ChartContainer } from './ui/chart';
import { Progress } from './ui/progress';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const StatisticsPage = ({ testId, results, totalTime }) => {
    const totalQuestions = results.length;
    const correctAnswers = results.filter(r => r.isCorrect).length;
    const accuracy = (correctAnswers / totalQuestions) * 100;
    const subtopicData = results.reduce((acc, result) => {
        const existingSubtopic = acc.find(item => item.name === result.subtopic);
        if (existingSubtopic) {
            result.isCorrect ? existingSubtopic.correct++ : existingSubtopic.incorrect++;
            existingSubtopic.total++;
        }
        else {
            acc.push({
                name: result.subtopic,
                correct: result.isCorrect ? 1 : 0,
                incorrect: result.isCorrect ? 0 : 1,
                total: 1
            });
        }
        return acc;
    }, []);
    const difficultyData = results.reduce((acc, result) => {
        const existingDifficulty = acc.find(item => item.name === result.difficulty);
        if (existingDifficulty) {
            result.isCorrect ? existingDifficulty.correct++ : existingDifficulty.incorrect++;
            existingDifficulty.total++;
        }
        else {
            acc.push({
                name: result.difficulty,
                correct: result.isCorrect ? 1 : 0,
                incorrect: result.isCorrect ? 0 : 1,
                total: 1
            });
        }
        return acc;
    }, []);
    const timeDistributionData = [
        { name: '0-30s', value: results.filter(r => r.timeTaken <= 30).length },
        { name: '31-60s', value: results.filter(r => r.timeTaken > 30 && r.timeTaken <= 60).length },
        { name: '61-90s', value: results.filter(r => r.timeTaken > 60 && r.timeTaken <= 90).length },
        { name: '91-120s', value: results.filter(r => r.timeTaken > 90 && r.timeTaken <= 120).length },
        { name: '>120s', value: results.filter(r => r.timeTaken > 120).length },
    ];
    const averageTimePerQuestion = totalTime / totalQuestions;
    const chartConfig = {
        correct: {
            label: "Correct",
            color: "hsl(var(--primary))",
        },
        incorrect: {
            label: "Incorrect",
            color: "hsl(var(--destructive))",
        },
    };
    return (_jsxs("div", { className: "space-y-6 p-6 max-w-6xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Quiz Performance Statistics" }), _jsxs("p", { className: "text-muted-foreground", children: ["Test ID: ", testId] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Summary" }) }), _jsxs(CardContent, { className: "grid gap-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: "Total Score:" }), _jsxs("span", { className: "font-bold", children: [correctAnswers, " / ", totalQuestions] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: "Accuracy:" }), _jsxs("span", { className: "font-bold", children: [accuracy.toFixed(2), "%"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: "Total Time:" }), _jsxs("span", { className: "font-bold", children: [(totalTime / 60).toFixed(2), " minutes"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: "Average Time per Question:" }), _jsxs("span", { className: "font-bold", children: [averageTimePerQuestion.toFixed(2), " seconds"] })] }), _jsxs("div", { children: [_jsx("span", { className: "block mb-2", children: "Overall Progress:" }), _jsx(Progress, { value: accuracy, className: "h-2" })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Time Distribution" }) }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: timeDistributionData, cx: "50%", cy: "50%", labelLine: false, outerRadius: 80, fill: "#8884d8", dataKey: "value", label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`, children: timeDistributionData.map((_entry, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, {}), _jsx(Legend, {})] }) }) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Results by Subtopic" }) }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: subtopicData, children: [_jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "correct", fill: "var(--color-correct)", stackId: "a", name: "Correct" }), _jsx(Bar, { dataKey: "incorrect", fill: "var(--color-incorrect)", stackId: "a", name: "Incorrect" })] }) }) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Results by Difficulty" }) }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: difficultyData, children: [_jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "correct", fill: "var(--color-correct)", stackId: "a", name: "Correct" }), _jsx(Bar, { dataKey: "incorrect", fill: "var(--color-incorrect)", stackId: "a", name: "Incorrect" })] }) }) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance by Subtopic" }) }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: subtopicData, children: [_jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "correct", fill: "var(--color-correct)", name: "Correct" }), _jsx(Bar, { dataKey: "total", fill: "var(--color-total)", name: "Total Questions" })] }) }) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance by Difficulty" }) }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: difficultyData, children: [_jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "correct", fill: "var(--color-correct)", name: "Correct" }), _jsx(Bar, { dataKey: "total", fill: "var(--color-total)", name: "Total Questions" })] }) }) }) })] })] })] }));
};
export default StatisticsPage;
