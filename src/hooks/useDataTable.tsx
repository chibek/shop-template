import { paramTonumber } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export const useDataTable = () => {
    const searchParams = useSearchParams();
    const pageParam = searchParams?.get("page");
    const per_pageParam = searchParams?.get("per_page");
    const sortParam = searchParams?.get("sort");
  
    const page = paramTonumber(pageParam, 1);
    const per_page = paramTonumber(per_pageParam, 10);
    const [column, order] = sortParam?.split(".") ?? [];

        return {
            page,
            per_page,
            column,
            order
        }
}