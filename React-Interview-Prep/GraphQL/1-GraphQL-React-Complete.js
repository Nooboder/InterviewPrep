// ============================================================
// GRAPHQL WITH REACT - COMPLETE INTERVIEW GUIDE
// ============================================================
// Topics: GraphQL fundamentals, Apollo Client, useQuery/useMutation,
//         Apollo Cache, Subscriptions, TanStack Query + GraphQL, urql
// Interview Level: Mid to Senior
// ============================================================

/**
 * WHY GRAPHQL MATTERS IN REACT INTERVIEWS
 * - Enterprise React apps (Big 4 clients) heavily use GraphQL APIs
 * - Apollo Client is the most common React GraphQL library
 * - Questions often focus on caching, optimistic UI, and schema design
 */

// ============================================================
// 1. GRAPHQL FUNDAMENTALS (React Context)
// ============================================================

/**
 * Q: What is GraphQL and how does it differ from REST for React developers?
 *
 * A:
 * REST: multiple endpoints, fixed response shapes → over-fetching/under-fetching
 * GraphQL: single endpoint, client specifies exact data needed
 *
 * For React:
 * REST: useEffect + fetch → manage loading/error state manually
 * GraphQL: Apollo/urql hooks → loading, error, data built-in + automatic caching
 *
 * Core operations:
 * - Query: read data (GET equivalent)
 * - Mutation: write data (POST/PUT/DELETE equivalent)
 * - Subscription: real-time data (WebSocket)
 * - Fragment: reusable field selection
 */

// ============================================================
// 2. APOLLO CLIENT SETUP
// ============================================================

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache({
    // Type policies control cache behavior per type
    typePolicies: {
      Query: {
        fields: {
          // Paginated field: merge pages into single list
          posts: {
            keyArgs: ['filter'], // separate cache entries per filter
            merge(existing = { nodes: [] }, incoming) {
              return {
                ...incoming,
                nodes: [...existing.nodes, ...incoming.nodes],
              };
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network', // show cached, then update with fresh
    },
  },
});

// Wrap app with ApolloProvider
function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}

// ============================================================
// 3. useQuery — READING DATA
// ============================================================

import { useQuery, gql } from '@apollo/client';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatar
      role
      posts(first: 5) {
        nodes {
          id
          title
          createdAt
        }
      }
    }
  }
`;

function UserProfile({ userId }) {
  const { data, loading, error, refetch, networkStatus } = useQuery(GET_USER, {
    variables: { id: userId },
    fetchPolicy: 'cache-first',     // use cache if available (default)
    // 'network-only': always hit network
    // 'cache-and-network': show cache immediately, fetch & update
    // 'no-cache': fetch always, don't cache
    skip: !userId,                  // skip query if userId is null
    pollInterval: 30000,            // re-fetch every 30s
    onCompleted: (data) => console.log('Fetched:', data),
    onError: (error) => reportError(error),
    notifyOnNetworkStatusChange: true, // update networkStatus during refetch
  });

  if (loading && !data) return <Skeleton />;
  if (error) return <ErrorMessage error={error} onRetry={() => refetch()} />;

  const { user } = data;
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Lazy query — execute on demand (not on mount)
import { useLazyQuery } from '@apollo/client';

function SearchUsers() {
  const [searchUsers, { loading, data }] = useLazyQuery(SEARCH_USERS);
  const [query, setQuery] = React.useState('');

  function handleSearch() {
    searchUsers({ variables: { query } });
  }

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {data?.users.map(u => <UserCard key={u.id} user={u} />)}
    </>
  );
}

// ============================================================
// 4. useMutation — WRITING DATA
// ============================================================

import { useMutation, gql } from '@apollo/client';

const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      content
      createdAt
      author {
        id
        name
      }
    }
  }
`;

function CreatePostForm() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    // Update cache after mutation (avoid refetching)
    update(cache, { data: { createPost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = { nodes: [] }) {
            const newPostRef = cache.writeFragment({
              data: createPost,
              fragment: gql`
                fragment NewPost on Post {
                  id
                  title
                  content
                  createdAt
                }
              `,
            });
            return { ...existingPosts, nodes: [newPostRef, ...existingPosts.nodes] };
          },
        },
      });
    },
    onCompleted: () => {
      setTitle('');
      setContent('');
    },
    onError: (error) => alert(error.message),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await createPost({
      variables: { input: { title, content } },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </button>
      {error && <p role="alert">{error.message}</p>}
    </form>
  );
}

// ============================================================
// 5. OPTIMISTIC UI IN APOLLO
// ============================================================

/**
 * Q: How do you implement optimistic updates with Apollo Client?
 *
 * A: Apollo Client supports optimistic responses — update the cache
 * immediately before the server responds, then reconcile when it does.
 */

const TOGGLE_LIKE = gql`
  mutation ToggleLike($postId: ID!) {
    toggleLike(postId: $postId) {
      id
      liked
      likeCount
    }
  }
`;

function LikeButton({ post }) {
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    variables: { postId: post.id },
    // Optimistic response: assume success immediately
    optimisticResponse: {
      toggleLike: {
        __typename: 'Post',
        id: post.id,
        liked: !post.liked,
        likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
      },
    },
  });

  return (
    <button onClick={() => toggleLike()}>
      {post.liked ? '❤️' : '🤍'} {post.likeCount}
    </button>
  );
}

// ============================================================
// 6. APOLLO CACHE — KEY CONCEPTS
// ============================================================

/**
 * Q: How does Apollo Client cache work?
 *
 * A: Apollo InMemoryCache uses a normalized cache:
 * - Each object is stored once, identified by __typename + id
 * - Queries reference these objects (no duplication)
 * - When an object updates, ALL queries referencing it update automatically
 *
 * fetchPolicy options:
 * - cache-first (default): use cache, fetch only if cache miss
 * - cache-only: only cache, never network
 * - cache-and-network: return cache immediately, fetch & update
 * - network-only: skip cache, always fetch, write to cache after
 * - no-cache: skip cache entirely (don't write either)
 */

// Reading/writing cache directly
const client = useApolloClient();

// Read a fragment from cache (no network request)
function getCachedUser(userId) {
  return client.cache.readFragment({
    id: `User:${userId}`,
    fragment: gql`
      fragment UserFields on User {
        id
        name
        email
      }
    `,
  });
}

// Write to cache directly (trigger UI update without network)
function updateUserInCache(userId, updates) {
  client.cache.writeFragment({
    id: `User:${userId}`,
    fragment: gql`
      fragment UpdatedUser on User {
        name
        email
      }
    `,
    data: updates,
  });
}

// evict + gc (remove from cache)
client.cache.evict({ id: `Post:${postId}` });
client.cache.gc(); // garbage collect unreachable objects

// ============================================================
// 7. GRAPHQL SUBSCRIPTIONS (Real-time)
// ============================================================

/**
 * Q: How do you implement real-time features with GraphQL subscriptions in React?
 *
 * A: GraphQL subscriptions use WebSockets. Apollo Client has built-in support
 * via graphql-ws or subscriptions-transport-ws.
 */

import { split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// Setup split link (HTTP for queries/mutations, WS for subscriptions)
const httpLink = new HttpLink({ uri: 'https://api.example.com/graphql' });

const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://api.example.com/graphql',
  connectionParams: { authToken: getAuthToken() },
}));

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,  // subscriptions → WebSocket
  httpLink  // queries/mutations → HTTP
);

const client = new ApolloClient({ link: splitLink, cache: new InMemoryCache() });

// useSubscription hook
import { useSubscription, gql } from '@apollo/client';

const MESSAGE_RECEIVED = gql`
  subscription OnMessageReceived($chatId: ID!) {
    messageReceived(chatId: $chatId) {
      id
      content
      createdAt
      sender { id name avatar }
    }
  }
`;

function ChatMessages({ chatId }) {
  const [messages, setMessages] = React.useState([]);

  useSubscription(MESSAGE_RECEIVED, {
    variables: { chatId },
    onData: ({ data: { data } }) => {
      setMessages(prev => [...prev, data.messageReceived]);
    },
  });

  return (
    <ul>
      {messages.map(msg => (
        <li key={msg.id}>{msg.sender.name}: {msg.content}</li>
      ))}
    </ul>
  );
}

// subscribeToMore — add subscription to existing query result
function ChatWithSubscription({ chatId }) {
  const { data, subscribeToMore } = useQuery(GET_MESSAGES, {
    variables: { chatId }
  });

  React.useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_RECEIVED,
      variables: { chatId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageReceived;
        return {
          messages: {
            ...prev.messages,
            nodes: [...prev.messages.nodes, newMessage],
          },
        };
      },
    });
    return unsubscribe;
  }, [chatId]);
}

// ============================================================
// 8. GRAPHQL FRAGMENTS
// ============================================================

/**
 * Q: What are GraphQL fragments and how do they help in React apps?
 *
 * A: Fragments are reusable field selections.
 * In React, co-locate fragments with the components that use the data
 * (Relay-style: each component declares its own data requirements).
 */

// Define fragment with the component that uses it
const USER_FIELDS = gql`
  fragment UserCardFields on User {
    id
    name
    email
    avatar
    role
  }
`;

function UserCard({ user }) {
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
    </div>
  );
}
UserCard.fragments = { user: USER_FIELDS }; // Relay pattern

// Parent query uses fragment
const GET_USERS = gql`
  ${UserCard.fragments.user}
  query GetUsers {
    users {
      nodes {
        ...UserCardFields
      }
    }
  }
`;

// ============================================================
// 9. ERROR HANDLING IN APOLLO
// ============================================================

/**
 * Q: How do you handle errors in Apollo Client?
 *
 * A: Apollo has two error types:
 * - GraphQL errors: returned in errors[] array with 200 status (logic errors)
 * - Network errors: HTTP failures, connection issues
 *
 * Handle globally with Apollo Link error handling.
 */

import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      if (extensions?.code === 'UNAUTHENTICATED') {
        // Refresh token and retry
        return fromPromise(refreshToken()).flatMap(() => forward(operation));
      }
      console.error(`GraphQL error: ${message} at ${path}`);
    });
  }
  if (networkError) {
    console.error(`Network error: ${networkError}`);
    if (networkError.statusCode === 401) {
      logout();
    }
  }
});

// ============================================================
// 10. TANSTACK QUERY + GRAPHQL (Without Apollo)
// ============================================================

/**
 * Q: How do you use TanStack Query (React Query) with a GraphQL API?
 *
 * A: TanStack Query is protocol-agnostic — use any fetch function.
 * Benefits over Apollo: simpler API, better TypeScript, no cache normalization.
 * Trade-off: no normalized cache (manual cache updates are more verbose).
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { request, gql } from 'graphql-request';

const GRAPHQL_URL = 'https://api.example.com/graphql';

// Reusable fetch function
const graphqlFetcher = (query, variables) =>
  request(GRAPHQL_URL, query, variables, {
    Authorization: `Bearer ${getToken()}`,
  });

// Query
function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', 'list'],
    queryFn: () => graphqlFetcher(gql`
      query {
        users { id name email }
      }
    `),
  });

  if (isLoading) return <Skeleton />;
  if (error) return <Error />;

  return <ul>{data.users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// Mutation with cache invalidation
function CreateUserForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input) => graphqlFetcher(gql`
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) { id name email }
      }
    `, { input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: 'John', email: 'john@example.com' })}>
      Create User
    </button>
  );
}

// ============================================================
// 11. urql — LIGHTWEIGHT ALTERNATIVE TO APOLLO
// ============================================================

/**
 * Q: What is urql and when would you choose it over Apollo?
 *
 * A: urql is a lightweight, modular GraphQL client.
 * - Smaller bundle (~7KB vs Apollo's ~35KB)
 * - Document caching by default (simpler than normalized)
 * - More modular — opt into normalized caching with @urql/exchange-graphcache
 * - Great for smaller apps or teams that find Apollo complex
 */

import { createClient, Provider, useQuery, useMutation } from 'urql';

const urqlClient = createClient({
  url: 'https://api.example.com/graphql',
  fetchOptions: () => ({
    headers: { Authorization: `Bearer ${getToken()}` },
  }),
});

function UrqlApp() {
  return (
    <Provider value={urqlClient}>
      <App />
    </Provider>
  );
}

function UrqlUserList() {
  const [{ data, fetching, error }] = useQuery({
    query: gql`query { users { id name } }`,
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <ul>{data.users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// ============================================================
// GRAPHQL + REACT INTERVIEW Q&A
// ============================================================

/**
 * Q: How does Apollo handle cache invalidation?
 * A: Automatic: when a mutation returns an object with matching __typename + id,
 *    all queries referencing it update automatically (normalized cache).
 *    Manual: cache.evict(), cache.modify(), or refetchQueries option on mutation.
 *
 * Q: What is a cache key in Apollo?
 * A: __typename:id (e.g., "User:123"). Apollo uses this to normalize the cache.
 *    If your type doesn't have id, use keyFields in typePolicies.
 *
 * Q: What is the N+1 problem in GraphQL?
 * A: Resolving a list of N items, each triggering its own DB query for related data.
 *    Solution: DataLoader (batches queries), or using @requires directive in Federation.
 *
 * Q: What is Apollo Federation?
 * A: Architecture for splitting a large GraphQL schema across multiple services
 *    (microservices). Each service owns part of the graph; a Gateway combines them.
 *
 * Q: What is persisted queries?
 * A: Instead of sending full query strings, send a hash.
 *    Reduces request payload, enables CDN caching of queries, improves security.
 *
 * Q: How do you test components that use Apollo Client?
 * A: Use MockedProvider from @apollo/client/testing:
 *    const mocks = [{ request: { query: GET_USER, variables: { id: '1' } },
 *                    result: { data: { user: { id: '1', name: 'John' } } } }];
 *    render(<MockedProvider mocks={mocks}><UserProfile userId="1" /></MockedProvider>)
 */
