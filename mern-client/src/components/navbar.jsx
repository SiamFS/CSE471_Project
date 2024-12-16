import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaBookOpen, FaTimes, FaShoppingCart, FaSignOutAlt, FaCamera } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthProvider';


function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const { user} = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [cartCount] = useState(0);
    const navigate = useNavigate();
    const profileRef = useRef(null);
    const fileInputRef = useRef(null);


    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };


    const toggleProfile = () => {
        setProfileOpen(!isProfileOpen);
    };
    const getDropdownPositionClass = () => {
        if (window.innerWidth < 768) {
            // On smaller screens, ensure dropdown is centered
            return 'right-0 left-0 mx-auto';
        } else if (profileRef.current) {
            const rect = profileRef.current.getBoundingClientRect();
            if (rect.right > window.innerWidth - 200) {
                // If dropdown would overflow, align to the right side
                return 'right-0';
            }
        }
        // Default centered alignment
        return 'right-1/2 transform translate-x-1/2';
    };
    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);


        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);


        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search/${searchTerm}`);
        }
    };


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
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
                    <Link to='/' className="text-2xl font-bold text-orange-400 flex items-center gap-2">
                        <FaBookOpen className='inline-block' /> Cover Book
                    </Link>
                   
                    <ul className="hidden md:flex space-x-8">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path} className="text-base font-semibold text-black hover:text-orange-400">{item.link}</Link>
                            </li>
                        ))}
                    </ul>
                   
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="relative" ref={profileRef}>
                                <button onClick={toggleProfile} className="text-black focus:outline-none">
                                    <img
                                        src={user.photoURL || "https://ibb.co/J5JqNKx"}
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                </button>
                                {isProfileOpen && (
                                    <div className={`absolute mt-2 w-64 bg-blue-200 rounded-lg shadow-xl py-2 px-4 ${getDropdownPositionClass()}`} style={{ minWidth: '200px' }}>
                                        <p className="text-center text-sm text-gray-600 mb-2">{`${user.firstName} ${user.lastName}`}</p>
                                        <p className="text-center text-sm text-gray-600 mb-2">{user.email}</p>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                        >
                                            <FaSignOutAlt className="mr-2" /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to='/login' className='text-black font-semibold'>Login</Link>
                        )}
                    </div>
                   
                    <button onClick={toggleMenu} className="md:hidden text-black focus:outline-none">
                        {isMenuOpen ? <FaTimes className='h-6 w-6' /> : <FaBars className='h-6 w-6' />}
                    </button>
                </nav>
               
                {isMenuOpen && (
                    <div className="md:hidden py-4 bg-white">
                        {navItems.map(({ link, path }) => (
                            <Link key={path} to={path} className='block py-2 text-base text-black hover:text-orange-400' onClick={toggleMenu}>{link}</Link>
                        ))}
                        {user ? (
                            <>
                                <p className="py-2 text-base font-bold text-black">{user.email}</p>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full py-2 text-base text-black hover:text-orange-400"
                                >
                                    <FaSignOutAlt className="mr-2" /> Logout
                                </button>
                            </>
                        ) : (
                            <Link to='/login' className='block py-2 text-base text-black hover:text-orange-400' onClick={toggleMenu}>Login</Link>
                        )}
                        <Link to='/add_to_payment' className='block py-2 text-base text-black hover:text-orange-400' onClick={toggleMenu}>
                            Cart ({cartCount})
                        </Link>
                    </div>
                )}
            </div>
           
            <div className="bg-transparent pb-1 ml-16">
                <div className="container mx-auto">
                    <div className="relative max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search books"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}


export default Navbar;