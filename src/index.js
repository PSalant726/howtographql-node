const { GraphQLServer } = require('graphql-yoga');
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];
let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => {
      return links.find(link => { return link.id === args.id; });
    }
  },
  Mutation: {
    createLink: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);

      return link;
    },

    updateLink: (root, args) => {
      for (let i = 0; i < links.length; i++) {
        const link = links[i];

        if (link.id === args.id) {
          link.description = args.description;
          link.url = args.url;

          return link;
        }
      }
    },

    deleteLink: (root, args) => {
      const removeIndex = links.findIndex(link => { return link.id === args.id; });
      const removedLink = links[removeIndex];

      if (removedLink) {
        links.splice(removeIndex, 1);

        return removedLink;
      }
    }
  }
};
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`)); // eslint-disable-line
