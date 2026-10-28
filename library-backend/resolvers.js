const Book = require("./models/book");
const Author = require("./models/author");
const { GraphQLError } = require("graphql/error");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre) {
        return Book.find({});
      }

      return Book.find({ genres: args.genre });
    },
    allAuthors: async () => Author.find({}),
  },
  Book: {
    title: ({ title }) => title,
    author: ({ author }) => author,
    published: ({ published }) => published,
    genres: ({ genres }) => genres,
  },
  Author: {
    name: ({ name }) => name,
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        try {
          author = await Author.create({ name: args.author });
        } catch (error) {
          throw new GraphQLError(`Saving new author failed: ${error.message}`, {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      try {
        const book = await Book.create({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id,
        });
        return book.populate("author");
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      author.born = args.setBornTo;
      await author.save();
      return author;
    },
  },
};

module.exports = resolvers;
