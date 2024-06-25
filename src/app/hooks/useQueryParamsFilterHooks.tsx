/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneDeep } from "lodash";
import { useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";

const useQueryParamsFilterHook = (
  responseData: any[], 
  filterKey: string, 
  paramKey: string, 
  onfilter: (arg: any) => void
) => {
  const queryParams = useSearchParams();
  const clonedRef = useRef<any[]>([]);

  useEffect(() => {
    if(clonedRef.current) {
      clonedRef.current = responseData;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  useEffect(() => {
    const searchQuery = queryParams?.get(paramKey ?? 'search') ?? '';
    let filteredData = cloneDeep(clonedRef.current);


    if (searchQuery) {
      filteredData = clonedRef?.current?.filter(data => data?.[filterKey]?.includes(searchQuery?.toString()));
      onfilter(JSON.parse(JSON.stringify(filteredData)));  // Call onfilter with the filtered data
      
    }else {
      onfilter(JSON.parse(JSON.stringify(filteredData)));  // Call onfilter with the filtered data
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);
}

export default useQueryParamsFilterHook;
