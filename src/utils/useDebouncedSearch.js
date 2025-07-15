import { useCallback, useEffect } from "react";
import debounce from "lodash.debounce";

const useDebouncedSearch = (searchFunction, delay = 400) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
        debounce((value) => {
            searchFunction(value);
        }, delay),
        [searchFunction, delay]
    );

    useEffect(() => {
        return () => debouncedSearch.cancel();
    }, [debouncedSearch]);

    return debouncedSearch;
};

export default useDebouncedSearch;

