export const formatTime = (utcTimestamp: string): string => {
    const now = new Date();
    const date = new Date(utcTimestamp);
    
    const timeZoneOffset = 8 * 60; 
    
    const localDate = new Date(date.getTime() + timeZoneOffset * 60 * 1000);

    const diffInMs = now.getTime() - localDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
        return "Just now";
    } else if (diffInMinutes < 5) {
        return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    const hours = localDate.getHours();
    const minutes = String(localDate.getMinutes()).padStart(2, '0');
    const isPM = hours >= 12;
    const displayHours = hours % 12 || 12; 
    const period = isPM ? 'PM' : 'AM';

    return `${displayHours}:${minutes} ${period}`;
}