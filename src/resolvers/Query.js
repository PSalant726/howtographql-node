function feed(parent, args, context, info) {
  let where = {};

  if (args.filter) {
    where.OR = [
      { url_contains: args.filter },
      { description_contains: args.filter }
    ];
  }

  return context.db.query.links(
    { where, skip: args.skip, first: args.first },
    info
  );
}

module.exports = { feed };
