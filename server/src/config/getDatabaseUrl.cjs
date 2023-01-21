const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/express-react-objection-boilerplate_development",
      test: "postgres://postgres:postgres@localhost:5432/express-react-objection-boilerplate_test",
      e2e: "postgres://postgres:postgres@localhost:5432/express-react-objection-boilerplate_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
