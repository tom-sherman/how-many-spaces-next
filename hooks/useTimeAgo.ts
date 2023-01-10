import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";

function calculateTimeAgo(date: Date): string {
    return formatDistance(
        date,
        new Date(),
        {
            includeSeconds: true,
            addSuffix: true
        }
    );
}

export default function useTimeAgo(dateString: string): string {
    const currentTimeAgo = calculateTimeAgo(new Date(dateString));
    const [timeAgo, setTimeAgo] = useState(currentTimeAgo);

    useEffect(() => {
        const currentTimeAgo = calculateTimeAgo(new Date(dateString));
        setTimeAgo(currentTimeAgo);

        let interval = setInterval(() => {
            const currentTimeAgo = calculateTimeAgo(new Date(dateString));
            setTimeAgo(currentTimeAgo);
        }, 5000);

        return () => clearInterval(interval);

    }, [dateString]);

    return timeAgo;
}