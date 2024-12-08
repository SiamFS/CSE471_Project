import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaBookOpen, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthProvider';

function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);
    const { user } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search/${searchTerm}`);
        }
    };

    const handleLogout = () => {
        navigate('/logout');
    };

    const navItems = [
        { link: 'Home', path: '/' },
        { link: 'About', path: '/about' },
        { link: 'Shop', path: '/shop' },
        { link: 'Sell your book', path: '/dashboard/upload' },
        { link: 'Blog', path: '/blog' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 ${isSticky ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between pt-1">
                    <Link to="/" className="text-2xl font-bold text-orange-400 flex items-center gap-2">
                        <FaBookOpen className="inline-block" /> Cover Book
                    </Link>

                    <ul className="hidden md:flex space-x-8">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path} className="text-base font-semibold text-black hover:text-orange-400">
                                    {item.link}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative max-w-xl">
                            <input
                                type="text"
                                placeholder="Search books"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                            <button
                                onClick={handleSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                            >
                                Search
                            </button>
                        </div>

                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                        ) : (
                            <Link to="/login" className="text-black font-semibold">
                                Login
                            </Link>
                        )}
                    </div>

                    <button onClick={toggleMenu} className="md:hidden text-black focus:outline-none">
                        {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                    </button>
                </nav>

                {isMenuOpen && (
                    <div className="md:hidden py-4 bg-white">
                        {navItems.map(({ link, path }) => (
                            <Link
                                key={path}
                                to={path}
                                className="block py-2 text-base text-black hover:text-orange-400"
                                onClick={toggleMenu}
                            >
                                {link}
                            </Link>
                        ))}
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full py-2 text-base text-black hover:text-orange-400"
                            >
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="block py-2 text-base text-black hover:text-orange-400"
                                onClick={toggleMenu}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Navbar;
