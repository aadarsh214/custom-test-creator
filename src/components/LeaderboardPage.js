import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Medal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
const mockLeaderboard = [
    {
        rank: 1,
        name: 'Aadarsh Gupta',
        questionsAttempted: 150,
        totalTime: '12h 30m',
        score: 920,
        avatar: '/placeholder.svg',
    },
    {
        rank: 2,
        name: 'Alex Johnson',
        questionsAttempted: 149,
        totalTime: '12h 30m',
        score: 910,
        avatar: '/placeholder.svg',
    },
    {
        rank: 3,
        name: 'Nifa Smith',
        questionsAttempted: 147,
        totalTime: '12h 30m',
        score: 900,
        avatar: '/placeholder.svg',
    },
    // Add more mock data as needed
];
const LeaderboardPage = () => {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Leaderboard" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Updated hourly" })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Top Performers" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: mockLeaderboard.map((entry) => (_jsxs("div", { className: "flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-8 text-center font-bold", children: entry.rank === 1 ? (_jsx(Medal, { className: "h-6 w-6 text-yellow-500" })) : entry.rank === 2 ? (_jsx(Medal, { className: "h-6 w-6 text-gray-400" })) : entry.rank === 3 ? (_jsx(Medal, { className: "h-6 w-6 text-amber-600" })) : (`#${entry.rank}`) }), _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: entry.avatar }), _jsx(AvatarFallback, { children: entry.name.slice(0, 2) })] }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: entry.name }), _jsxs("div", { className: "text-sm text-muted-foreground", children: ["Score: ", entry.score] })] })] }), _jsxs("div", { className: "hidden md:block text-right", children: [_jsxs("div", { className: "font-medium", children: [entry.questionsAttempted, " questions"] }), _jsxs("div", { className: "text-sm text-muted-foreground", children: ["Total time: ", entry.totalTime] })] })] }, entry.rank))) }) })] })] }));
};
export default LeaderboardPage;
