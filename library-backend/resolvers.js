const Book = require("./models/book");
const Author = require("./models/author");

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
        author = await Author.create({ name: args.author });
      }

      const book = await Book.create({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      });

      return book.populate("author");
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
