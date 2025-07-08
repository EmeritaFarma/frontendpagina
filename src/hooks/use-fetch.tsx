import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'

interface UseFetchProps<T> {
    queryKey: string | readonly unknown[];
    queryFn: () => Promise<T>;
    options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
}

export function useFetch<T>({ 
    queryKey, 
    queryFn, 
    options = {} 
}: UseFetchProps<T>): UseQueryResult<T> {
    
    const normalizedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];
    
    return useQuery({
        queryKey: normalizedQueryKey,
        queryFn,
        ...options,
    });
}