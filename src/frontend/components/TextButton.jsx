export default function TextButton({ className, onClick, title }) {
    return (
        <button
            onClick={onClick}
            className={
                className || "bg-gray-300 border border-black rounded-sm"
            }>
            {title || "Button"}
        </button>
    );
}
