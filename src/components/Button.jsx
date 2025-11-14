
export default function Button({ type, children }) {
    return (
        <>
            {!type && (
                <a className="flex cursor-pointer text-white font-bold my-10 bg-red-800 py-3 px-5 rounded-2xl w-fit gap-3 shadow-[2px_2px_50px] shadow-red-800 hover:shadow-[0px_0px_30px] hover:shadow-red-600 hover:scale-105 transition-all">
                    {children}
                </a>
            )}

            {type == "secondary" && (
                <a className="flex cursor-pointer text-black font-bold my-10 bg-white py-3 px-5 rounded-2xl w-fit gap-3 shadow-lg shadow-gray-700 hover:shadow-[0px_0px_30px] hover:shadow-gray-400 hover:scale-105 transition-all">
                    {children}
                </a>
            )}
        </>
    );
}
