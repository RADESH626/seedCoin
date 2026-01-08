"use client";

import { useAuth } from '@/context/AuthContext';
import Logo from './Logo';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <header className="w-full py-4 px-6 flex items-center justify-between bg-black sticky top-0 z-50 border-b border-gray-800">
            {/* Left: App Icon */}
            <Logo />

            {/* Center: Navigation Links */}
            <NavLinks isAuthenticated={isAuthenticated} />

            {/* Right: Login Button or User Icon */}
            <UserMenu user={user} isAuthenticated={isAuthenticated} logout={logout} />
        </header>
    );
}
