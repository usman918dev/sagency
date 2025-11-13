"use client"

export default function Button({ text,href }) {
    return (
        <a
            className={`group relative inline-block overflow-hidden border border-[#fff] hover:border-[#F25725] px-8 py-3 focus:ring-3 focus:outline-hidden rounded transition-colors duration-600 shadow-xl`}
            href={`${href}`}
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
export function SecondButton({ text, href}) {
    return (
        <a
            className={`group relative inline-block overflow-hidden bg border border-[#F25725] hover:border-[#F25725] px-8 py-3 focus:ring-3 focus:outline-hidden rounded transition-colors duration-600 shadow-xl`}
            href={`${href}`}
        >
            <span
                className="absolute inset-y-0 left-0 w-full bg-[#F25725] transition-all group-hover:w-[0px]"
            ></span>

            <span
                className="relative text-sm font-semibold text-white transition-colors group-hover:text-white"
            >
                {text}
            </span>
        </a>
    )
}