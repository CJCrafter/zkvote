export default function Candidate({img, fullName, description}: {img: string, fullName: string, description: string}) {
    return <>
        <div className="flex items-center">
            <img src={img} alt={fullName} className="rounded-full w-64 h-64" />
            <div className="ml-4">
                <h2 className="text-2xl font-semibold">{fullName}</h2>
                <p className="m-0 text-sm opacity-50">{description}</p>
            </div>
        </div>

    </>
}