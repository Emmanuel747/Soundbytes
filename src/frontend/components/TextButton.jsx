export default function TextButton({ className, onClick, title, type }) {
    return (
        <button
            type={type}
            style={{padding: '7px', paddingInline: '17px'}}
            onClick={onClick}
            className={
              className || "bg-gray-300 border border-black rounded-sm"
            }>
            {title || "Button"}
            
        </button>
    );
}
