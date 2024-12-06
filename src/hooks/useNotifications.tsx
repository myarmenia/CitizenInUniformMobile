import { useQuery } from "@tanstack/react-query"
import { getNotifications } from "../api/requests"


export const useNotifications = () => {
    const { data: notifications, isError, isFetching } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
        retryDelay: 10000,
        select: (data) => data?.data.result,
    })

    return {
        notifications,
        isError,
        isFetching,
    }
}