// ============================================================
// TANSTACK QUERY (React Query) - INTERVIEW PREPARATION
// ============================================================

/**
 * TanStack Query (formerly React Query) is becoming industry standard
 * Used by Google, Meta, Stripe, Vercel, TCS, Cognizant
 * Interview focus: Caching, sync, stale-while-revalidate
 */

// ============================================================
// 1. TANSTACK QUERY FUNDAMENTALS
// ============================================================

/*
Q1: What is TanStack Query and why use it?
A: TanStack Query is server state management:
   - Automatic caching
   - Background refetching
   - Stale-while-revalidate pattern
   - Optimistic updates
   - Infinite queries
   - Request deduplication

   Problem it solves:
   - Managing API state complexity
   - Avoiding prop drilling
   - Sync with server state
   - Handling loading/error states

Q2: What's the difference between server state and client state?
A: Server state:
   - Belongs on server (API)
   - Often stale after fetch
   - Needs sync with server
   - Shared across users/tabs

   Client state:
   - Local to component/app (UI state, forms)
   - Always accurate in client
   - Doesn't sync with server

   TanStack Query: Manages server state
   Redux/Context: Manages client state

Q3: What's stale-while-revalidate pattern?
A: Return cached data immediately, refresh in background:
   ```
   // User gets cached data instantly
   // Query fetches fresh data
   // Updates UI when fresh data arrives
   ```
   Better UX: Shows data immediately instead of loading

Q4: Explain the caching mechanism
A: TanStack Query caches by queryKey:
   ```
   // First call: Fetches data, caches with key ['users']
   useQuery(['users'], fetchUsers);

   // Second call: Returns cached data (if not stale)
   useQuery(['users'], fetchUsers);

   // Different key: Separate cache entry
   useQuery(['users', 1], () => fetchUser(1));
   ```

Q5: What's queryKey and why is it important?
A: Unique identifier for query:
   ```
   // Nested arrays for dependent queries
   ['users']           // All users
   ['users', 1]        // User with id 1
   ['users', 1, 'posts']  // User's posts
   ```
   TanStack Query automatically manages cache based on queryKey
*/

// ============================================================
// 2. TANSTACK QUERY HOOKS & QUERIES
// ============================================================

/*
Q6: How to use useQuery hook?
A: ```
   import { useQuery } from '@tanstack/react-query';

   function Users() {
     const { data, isLoading, isError, error } = useQuery({
       queryKey: ['users'],
       queryFn: async () => {
         const res = await fetch('/api/users');
         if (!res.ok) throw new Error('Failed to fetch');
         return res.json();
       },
       staleTime: 5 * 60 * 1000, // 5 minutes
       cacheTime: 10 * 60 * 1000, // 10 minutes
     });

     if (isLoading) return <div>Loading...</div>;
     if (isError) return <div>Error: {error.message}</div>;

     return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
   }
   ```

Q7: What's the difference between staleTime and cacheTime?
A: staleTime: How long before data is considered stale
   - Data is fresh during this period
   - Don't refetch while fresh

   cacheTime (gcTime in v5): How long to keep unused query in cache
   - After this, remove from memory
   - If user returns, refetch fresh data
   ```
   staleTime: 5m (fresh for 5 mins)
   cacheTime: 10m (keep in memory for 10 mins)
   ```

Q8: How to handle dependent/sequential queries?
A: ```
   // First query
   const { data: user } = useQuery({
     queryKey: ['user', userId],
     queryFn: () => fetchUser(userId),
   });

   // Second query depends on first
   const { data: posts } = useQuery({
     queryKey: ['posts', user?.id],
     queryFn: () => fetchPosts(user.id),
     enabled: !!user?.id, // Only run if user exists
   });
   ```

Q9: What's useMutation hook?
A: For mutations (POST, PUT, DELETE):
   ```
   const { mutate, isPending } = useMutation({
     mutationFn: async (newUser) => {
       const res = await fetch('/api/users', {
         method: 'POST',
         body: JSON.stringify(newUser),
       });
       return res.json();
     },
     onSuccess: (data) => {
       queryClient.invalidateQueries(['users']);
     },
     onError: (error) => {
       console.error(error);
     },
   });

   return <button onClick={() => mutate({ name: 'John' })}>Add User</button>;
   ```

Q10: What's query invalidation?
A: Mark query as stale and refetch:
   ```
   const queryClient = useQueryClient();

   const { mutate } = useMutation({
     mutationFn: createUser,
     onSuccess: () => {
       // Invalidate users query
       queryClient.invalidateQueries({
         queryKey: ['users'],
       });
     },
   });
   ```
*/

// ============================================================
// 3. ADVANCED TANSTACK QUERY
// ============================================================

/*
Q11: What's useInfiniteQuery?
A: Paginated/infinite scroll queries:
   ```
   const {
     data,
     fetchNextPage,
     hasNextPage,
     isFetchingNextPage,
   } = useInfiniteQuery({
     queryKey: ['posts'],
     queryFn: async ({ pageParam = 1 }) => {
       const res = await fetch(`/api/posts?page=${pageParam}`);
       return res.json();
     },
     getNextPageParam: (lastPage) => {
       return lastPage.nextPage ?? undefined;
     },
   });

   return (
     <div>
       {data?.pages.map((page) =>
         page.posts.map((post) => <Post key={post.id} {...post} />)
       )}
       <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
         {isFetchingNextPage ? 'Loading...' : 'Load More'}
       </button>
     </div>
   );
   ```

Q12: What's optimistic updates?
A: Update UI before server responds:
   ```
   const { mutate } = useMutation({
     mutationFn: updateUser,
     onMutate: async (newData) => {
       // Cancel outgoing refetches
       await queryClient.cancelQueries(['user']);

       // Snapshot previous data
       const previousData = queryClient.getQueryData(['user']);

       // Optimistically update
       queryClient.setQueryData(['user'], newData);

       return { previousData };
     },
     onError: (err, newData, context) => {
       // Revert on error
       queryClient.setQueryData(['user'], context.previousData);
     },
   });
   ```

Q13: How to manually control queries?
A: ```
   const queryClient = useQueryClient();

   // Get data
   const data = queryClient.getQueryData(['user']);

   // Set data
   queryClient.setQueryData(['user'], newData);

   // Invalidate (mark stale)
   queryClient.invalidateQueries(['user']);

   // Refetch
   queryClient.refetchQueries(['user']);

   // Remove from cache
   queryClient.removeQueries(['user']);
   ```

Q14: What's query deduplication?
A: Same query made multiple times = one request:
   ```
   // All these make ONE request
   useQuery(['users'], fetchUsers);
   useQuery(['users'], fetchUsers);
   useQuery(['users'], fetchUsers);

   // Different keys = separate requests
   useQuery(['users', 1], fetchUser);
   useQuery(['users', 2], fetchUser);
   ```

Q15: How to handle real-time updates?
A: ```
   useEffect(() => {
     const subscription = subscribeToUpdates((newData) => {
       queryClient.setQueryData(['data'], newData);
     });

     return () => subscription.unsubscribe();
   }, [queryClient]);
   ```
*/

// ============================================================
// 4. TANSTACK QUERY CONFIGURATION
// ============================================================

/*
Q16: How to configure QueryClient?
A: ```
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

   const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         staleTime: 5 * 60 * 1000,
         gcTime: 10 * 60 * 1000, // v5+
         retry: 3,
         retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
       },
       mutations: {
         retry: 1,
       },
     },
   });

   export default function App() {
     return (
       <QueryClientProvider client={queryClient}>
         <MainApp />
       </QueryClientProvider>
     );
   }
   ```

Q17: What's the retry mechanism?
A: Automatically retry failed requests:
   ```
   useQuery({
     queryKey: ['users'],
     queryFn: fetchUsers,
     retry: 3, // Retry 3 times
     retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
     // Exponential backoff: 1s, 2s, 4s, 8s, ...
   });
   ```

Q18: How to handle different query states?
A: ```
   const { status, data, error, isLoading, isError, isSuccess } = useQuery(...);

   // Different approaches
   if (isLoading) return <Spinner />;
   if (isError) return <Error error={error} />;
   return <Data data={data} />;

   // Or use status
   switch (status) {
     case 'loading': return <Spinner />;
     case 'error': return <Error error={error} />;
     case 'success': return <Data data={data} />;
   }
   ```

Q19: How to persist queries?
A: Use persist plugin:
   ```
   import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
   import { persistQueryClient } from '@tanstack/react-query-persist-client';

   const persister = createSyncStoragePersister({
     storage: window.localStorage,
   });

   persistQueryClient({
     queryClient,
     persister,
     maxAge: 24 * 60 * 60 * 1000, // 24 hours
   });
   ```

Q20: TanStack Query with TypeScript
A: ```
   interface User { id: number; name: string; }

   const fetchUsers = async (): Promise<User[]> => {
     const res = await fetch('/api/users');
     return res.json();
   };

   function Users() {
     const { data: users } = useQuery<User[]>({
       queryKey: ['users'],
       queryFn: fetchUsers,
     });

     return users?.map(u => <User key={u.id} {...u} />);
   }
   ```
*/

// ============================================================
// 5. TANSTACK QUERY VS ALTERNATIVES
// ============================================================

/*
Q21: TanStack Query vs Redux for API data?
A: Redux: Generic state management
   - More boilerplate
   - Manual cache handling
   - Not optimized for API data

   TanStack Query: Server state optimized
   - Less boilerplate
   - Built-in caching
   - Automatic sync
   - Better DX

   Answer: Use TanStack Query for API, Redux for client state

Q22: TanStack Query vs SWR?
A: TanStack Query:
   - ✅ More features (infinite, pagination)
   - ✅ Better control
   - ✅ Larger community
   - ❌ Bigger bundle

   SWR:
   - ✅ Simpler API
   - ✅ Smaller bundle
   - ❌ Fewer features

Q23: Common TanStack Query mistakes
A: 1. Setting staleTime too long
   2. Not using queryKey properly
   3. Manual state management (use Query instead)
   4. Not invalidating on mutations
   5. Ignoring cacheTime

Q24: How to debug TanStack Query?
A: - React Query DevTools
   - Console logs
   - Check queryClient state
   - Monitor network requests
   ```
   import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

   <QueryClientProvider client={queryClient}>
     <App />
     <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
   ```

Q25: Real-world example: User Profile + Posts
A: ```
   function UserProfile({ userId }: { userId: number }) {
     // Fetch user
     const { data: user } = useQuery({
       queryKey: ['user', userId],
       queryFn: () => fetchUser(userId),
     });

     // Fetch posts (depends on user)
     const { data: posts } = useQuery({
       queryKey: ['posts', user?.id],
       queryFn: () => fetchPosts(user.id),
       enabled: !!user?.id,
     });

     // Update user
     const { mutate: updateUser } = useMutation({
       mutationFn: (newData) => updateUserAPI(userId, newData),
       onSuccess: () => {
         queryClient.invalidateQueries(['user', userId]);
       },
     });

     if (!user) return <div>Loading...</div>;

     return (
       <div>
         <h1>{user.name}</h1>
         <button onClick={() => updateUser({ name: 'New Name' })}>Update</button>
         <ul>
           {posts?.map(p => <li key={p.id}>{p.title}</li>)}
         </ul>
       </div>
     );
   }
   ```
*/

// ============================================================
// TANSTACK QUERY INTERVIEW TIPS
// ============================================================

/*
TCS/Cognizant (Junior to Mid):
- Know useQuery basics
- Understand staleTime/cacheTime
- Can use useMutation
- Know query invalidation

Big4 (Mid to Senior):
- Advanced patterns (infinite, optimistic)
- Performance optimization
- Cache strategy
- Error handling
- When to use vs Redux/Context

Most asked questions:

1. "What's stale-while-revalidate?"
   - Return cached, refresh in background

2. "How is TanStack Query different from Redux?"
   - TQ optimized for server state, Redux for client state

3. "How to handle dependent queries?"
   - Use enabled: !!dependency

4. "How to do optimistic updates?"
   - onMutate to update before response

5. "What's query deduplication?"
   - Same query = one request
*/

export const TANSTACK_QUERY_TOPICS = {
  FUNDAMENTALS: [1, 2, 3, 4, 5],
  HOOKS: [6, 7, 8, 9, 10],
  ADVANCED: [11, 12, 13, 14, 15],
  CONFIGURATION: [16, 17, 18, 19, 20],
  PATTERNS: [21, 22, 23, 24, 25],
};
