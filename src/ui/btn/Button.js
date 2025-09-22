"use client"

export default function Button({ text, bg, hbg }) {
    return (
        <a
            className={`group relative inline-block overflow-hidden border border-[#fff] hover:border-[#F25725] px-8 py-3 focus:ring-3 focus:outline-hidden rounded transition-colors duration-600 shadow-md`}
            href="#"
        >
            <span
                className="absolute inset-y-0 left-0 w-[0px] bg-[#F25725] transition-all group-hover:w-full"
            ></span>

            <span
                className="relative text-sm font-semibold text-white transition-colors group-hover:text-white"
            >
                {text}
            </span>
        </a>
    )
}
