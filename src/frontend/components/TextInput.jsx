export default function TextInput({
    placeHolder,
    inputType,
    className,
    setText,
}) {
    return (
        <input
            type={inputType || "text"}
            className={className || "border border-black rounded-sm"}
            placeholder={placeHolder || "Enter text"}
            onChange={(event) => {
                setText(event.target.value);
            }}
        />
    );
}
