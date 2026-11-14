import React from 'react';

function NavbarSkeleton() {
    return (
        <nav className="bg-zinc-200/10 shadow-sm py-0.5 border-b border-gray-900 heading">
            <div className="container mx-auto flex justify-between items-center px-4 lg:px-6">
                <div className="flex items-center">
                    <div className="w-20 h-20 bg-linear-to-bl from-zinc-600/20 to-stone-600/20 rounded animate-pulse" />
                </div>

                <div className="flex items-center space-x-4">
                    <div className="h-6 w-20 bg-zinc-600/40 rounded animate-pulse" />
                    <div className="h-6 w-16 bg-zinc-600/40 rounded animate-pulse" />
                    <div className="flex items-center justify-center gap-2.5 ml-0.5 rounded-md py-2 px-3 bg-zinc-600/40 animate-pulse w-24 h-10" />
                </div>
            </div>
        </nav>
    );
}

export default NavbarSkeleton;