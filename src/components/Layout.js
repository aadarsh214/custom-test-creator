import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, History, Trophy, Menu, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
const Layout = ({ children }) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    // Load theme preference from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkTheme(savedTheme === 'dark');
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        }
    }, []);
    // Toggle theme and save preference to localStorage
    const toggleTheme = () => {
        const newTheme = !isDarkTheme ? 'dark' : 'light';
        setIsDarkTheme(!isDarkTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
    };
    const navigation = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'History', href: '/history', icon: History },
        { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    ];
    return (_jsxs("div", { className: `flex min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-black'}`, children: [_jsx("div", { className: "hidden lg:flex lg:w-64 lg:flex-col", children: _jsxs("div", { className: "flex flex-col gap-2 border-r p-6", children: [_jsx("div", { className: "flex h-16 items-center px-4", children: _jsx("h1", { className: "text-2xl font-bold", children: "Quiz Platform" }) }), _jsx(ScrollArea, { className: "flex-1", children: _jsx("nav", { className: "flex flex-col h-screen gap-2 p-4", children: navigation.map((item) => {
                                    const Icon = item.icon;
                                    return (_jsx(Link, { to: item.href, children: _jsxs("span", { className: `group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${location.pathname === item.href ? 'bg-accent' : 'transparent'}`, children: [_jsx(Icon, { className: "mr-2 h-4 w-4" }), item.name] }) }, item.name));
                                }) }) }), _jsxs("button", { onClick: toggleTheme, className: "fixed bottom-0 flex items-center mb-2 gap-2 rounded-md p-2 text-sm font-medium hover:bg-accent", children: [isDarkTheme ? _jsx(Sun, { className: "h-4 w-4" }) : _jsx(Moon, { className: "h-4 w-4" }), isDarkTheme ? "Use Light Mode" : "Use Dark Mode"] })] }) }), _jsxs(Sheet, { open: isMobileMenuOpen, onOpenChange: setIsMobileMenuOpen, children: [_jsx(SheetTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "icon", className: "lg:hidden", children: [_jsx(Menu, { className: "h-6 w-6" }), _jsx("span", { className: "sr-only", children: "Toggle menu" })] }) }), _jsxs(SheetContent, { side: "left", className: "w-64", children: [_jsx("div", { className: "flex h-16 items-center", children: _jsx("h1", { className: "text-2xl font-bold", children: "Quiz Platform" }) }), _jsx(ScrollArea, { className: "flex-1", children: _jsx("nav", { className: "flex flex-col gap-2 p-4", children: navigation.map((item) => {
                                        const Icon = item.icon;
                                        return (_jsx(Link, { to: item.href, onClick: () => setIsMobileMenuOpen(false), children: _jsxs("span", { className: `group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${location.pathname === item.href ? 'bg-accent' : 'transparent'}`, children: [_jsx(Icon, { className: "mr-2 h-4 w-4" }), item.name] }) }, item.name));
                                    }) }) }), _jsxs("button", { onClick: toggleTheme, className: "mt-4 flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-accent", children: [isDarkTheme ? _jsx(Sun, { className: "h-4 w-4" }) : _jsx(Moon, { className: "h-4 w-4" }), isDarkTheme ? "Use Light Mode" : "Use Dark Mode"] })] })] }), _jsx("main", { className: "flex-1 overflow-y-auto", children: _jsx("div", { className: "container mx-auto p-6", children: children }) })] }));
};
export default Layout;
