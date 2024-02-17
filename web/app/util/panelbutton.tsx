export default function PanelButton(
    {href, text, description}: { href: string, text: string, description: string }
) {
    return (
        <a
            href={href}
            className="
                group rounded-lg border border-transparent px-5 py-4 m-2
                border-gray-200 bg-gray-100
                hover:border-gray-400 hover:bg-gray-300 transition-colors
            "
            target="_blank"
            rel="noopener noreferrer"
        >
            <h2 className="mb-3 text-2xl font-semibold">
                {text}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    →
                </span>
            </h2>
            <p className="m-0 text-sm opacity-50">
                {description}
            </p>
        </a>
    )
}