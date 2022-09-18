module.exports.makeFilterObject = (queryOby) => {
  const queryStr = JSON.stringify(queryOby).replace(
    /\b(lt|lte|gt|gte)/g,
    (expr) => "$" + expr
  );
  return JSON.parse(queryStr);
};
