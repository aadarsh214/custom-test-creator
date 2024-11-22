import React from 'react';
interface QuestionResult {
    subtopic: string;
    difficulty: string;
    isCorrect: boolean;
    timeTaken: number;
}
interface StatisticsProps {
    testId: string;
    results: QuestionResult[];
    totalTime: number;
}
declare const StatisticsPage: React.FC<StatisticsProps>;
export default StatisticsPage;
