export default function TextInput({
    placeHolder,
    inputType,
    className,
    setText,
}) {
    return (
      <input
        required
        type={inputType || "text"}
        className={className || "border border-black rounded-sm"}
        placeholder={placeHolder || "Enter text"}

      />
    );
}
