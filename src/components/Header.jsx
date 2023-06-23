import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <>
            <motion.header
                style={{ background: "black" }}
                className="text-white body-font"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >                <div class="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
                    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span class="ml-3 text-white text-xl">SoundWaves</span>
                    </a>
                    <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        <a class="mr-5 hover:text-green-600"></a>
                    </nav>
                    <Link to="/register" class="inline-flex text-black items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Add More +
                    </Link>
                </div>
            </motion.header>
        </>
    )
}

export default Header