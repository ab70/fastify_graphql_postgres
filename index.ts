import Fastify from "fastify";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer, type BaseContext } from '@apollo/server';
import fastifyApollo, { fastifyApolloDrainPlugin } from "@as-integrations/fastify";


const typeDefs = `
    type Book {
        title: String
        author: String
    }
    type Query {
        books: [Book]
    }
`;
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
const resolvers = {

    Query: {

        books: () => books,

    },

};

const fastify = Fastify({
    logger: false
})
const apollo = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(fastify)],
  });
// fastify.get("/", async () => {
//     return { hello: "helloooW" }
// })
await apollo.start()
await fastify.register(fastifyApollo(apollo));

fastify.listen({ port: 3000 })