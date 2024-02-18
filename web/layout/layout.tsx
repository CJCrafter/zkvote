import Navbar from './navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}