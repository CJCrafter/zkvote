// props


export default function IconButton({href, name, logo}: {href: string, name: string, logo: string} ) {
    return <a href={href} className="text-blue-600 underline hover:text-gray-600">
        {name} <img src={logo} alt={name} className="w-6 h-6 inline" />
    </a>
}