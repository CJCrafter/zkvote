import Link from "next/link";

export default function PanelButton(
    {href, text, description}: { href: string, text: string, description: string }
) {
    return (
        <Link
            href={href}
            className="
                group rounded-lg border border-transparent px-5 py-4 m-2
                border-gray-700 bg-gradient-to-r from-cyan-500 to-blue-500
                hover:border-gray-800 hover:from-cyan-600 hover:to-blue-600 transition-colors"
            rel="noopener noreferrer"
        >
            <h2 className="mb-3 text-2xl font-semibold">
                {text}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                    →
                </span>
            </h2>
            <p className="m-0 text-sm opacity-50">
                {description}
            </p>
        </Link>
    )
}