import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCreateQueryString = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const createQueryString = useCallback(
        (params: Record<string, string | number | null>) => {
          const newSearchParams = new URLSearchParams(searchParams?.toString());
    
          for (const [key, value] of Object.entries(params)) {
            if (value === null) {
              newSearchParams.delete(key);
            } else {
              newSearchParams.set(key, String(value));
            }
          }
    
          return newSearchParams.toString();
        },
        [searchParams]
      );

      return {
        searchParams,
        router,
        pathname,
        createQueryString
      }
}