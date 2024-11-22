import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
const plans = [
    {
        name: 'Basic',
        price: 'Free',
        description: 'Get started with basic features',
        features: ['10 questions per test', 'Basic topics only', 'Standard support'],
    },
    {
        name: 'Pro',
        price: '$9.99',
        description: 'Perfect for serious learners',
        features: [
            'Unlimited questions',
            'All topics and subtopics',
            'Premium support',
            'Advanced analytics',
            'Custom difficulty levels',
        ],
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For teams and organizations',
        features: [
            'Everything in Pro',
            'Team management',
            'Custom question pools',
            'API access',
            'Dedicated support',
        ],
    },
];
const PaymentPage = () => {
    return (_jsxs("div", { className: "container mx-auto py-10", children: [_jsxs("div", { className: "text-center mb-10", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "Choose Your Plan" }), _jsx("p", { className: "text-muted-foreground", children: "Select the perfect plan for your learning needs" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: plans.map((plan) => (_jsxs(Card, { className: "flex flex-col", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: plan.name }), _jsx(CardDescription, { children: plan.description })] }), _jsxs(CardContent, { className: "flex-1", children: [_jsx("div", { className: "text-3xl font-bold mb-6", children: plan.price }), _jsx("ul", { className: "space-y-2", children: plan.features.map((feature) => (_jsxs("li", { className: "flex items-center", children: [_jsx(Check, { className: "h-4 w-4 mr-2 text-primary" }), feature] }, feature))) })] }), _jsx(CardFooter, { children: _jsx(Button, { className: "w-full", children: plan.price === 'Free' ? 'Get Started' : 'Subscribe' }) })] }, plan.name))) })] }));
};
export default PaymentPage;
