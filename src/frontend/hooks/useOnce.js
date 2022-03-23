import { useState, useEffect } from "react";

export default function useOnce(Obj) {
    const [instance, setInstance] = useState(Obj);

    useEffect(() => {
        // console.log("rerendering", instance.toString());

        if (!instance) setInstance(Obj);

        // return () => {
        //     setInstance(undefined);
        // };
    }, []);

    return instance;
}
