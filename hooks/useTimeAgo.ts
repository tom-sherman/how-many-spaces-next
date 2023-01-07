import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";

export default function useTimeAgo(dateString: string): string {
    const currentTimeAgo = formatDistance(
        new Date(dateString),
        new Date(),
        {
            includeSeconds: true,
            addSuffix: true
        }
    );
    
    const [timeAgo, setTimeAgo] = useState(currentTimeAgo);

    useEffect(() => {
        let interval = setInterval(() => {
            setTimeAgo(currentTimeAgo);
        }, 5000);

        return () => clearInterval(interval);

    }, [dateString]);

    return timeAgo;
}