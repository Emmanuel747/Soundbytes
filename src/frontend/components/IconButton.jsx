import { CgUnavailable } from "react-icons/cg";

export default function IconButton({ icon, onClick }) {
    return <div onClick={onClick}>{icon || <CgUnavailable />}</div>;
}
