import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';
import { getCurrentOrganization } from './curorg';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  let token = sessionStorage.getItem(AUTH_TOKEN);
  if (!token) {
    token = localStorage.getItem(AUTH_TOKEN);
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'organization-id': getCurrentOrganization()?.id || '',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default apolloClient;
