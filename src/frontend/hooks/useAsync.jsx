import { useEffect, useState } from "react";

export default function useAsync(asyncCallback) {
    const [state, setState] = useState();

    useEffect(() => {
        const startAsync = async () => {
            const output = await asyncCallback();
            setState(output);
        };
        startAsync();
    }, []);

    return state;
}
