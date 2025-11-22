
export default function Button({ type, children, onClick }) {
    return (
        <>
            {!type && (
                <button onClick={onClick} className="flex items-center cursor-pointer text-white font-bold bg-red-800 py-3 px-5 rounded-2xl w-fit gap-3 shadow-[2px_2px_50px] shadow-red-800 hover:shadow-[0px_0px_30px] hover:shadow-red-600 hover:scale-105 transition-all">
                    {children}
                </button>
            )}

            {type == "secondary" && (
                <button onClick={onClick} className="flex items-center cursor-pointer text-black font-bold bg-white py-3 px-5 rounded-2xl w-fit gap-3 shadow-lg shadow-gray-700 hover:shadow-[0px_0px_30px] hover:shadow-gray-400 hover:scale-105 transition-all">
                    {children}
                </button>
            )}

            {type == "x" && (
                <button onClick={onClick} className="cursor-pointer absolute top-4 right-4 w-10 h-10 rounded-full bg-red-800 hover:bg-white/20 flex items-center justify-center text-white text-l hover:scale-105 transition-all">
                    ✕
                </button>
            )}
        </>
    );
}
