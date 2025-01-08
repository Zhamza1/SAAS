import { RdvList } from "@/components/RdvList";
import NavBar from "@/components/Navbar";

export default function Page() {
    return (
        <div>
            <NavBar />
            <div className="flex h-screen w-full items-center justify-center px-4">
                <RdvList />
            </div>
        </div>
    );
}
