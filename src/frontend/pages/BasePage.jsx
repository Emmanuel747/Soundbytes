import { Navbar } from "../components";

export default function BasePage({ children }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}