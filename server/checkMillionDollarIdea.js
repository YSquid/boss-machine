const checkMillionDollarIdea = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body;
  //keep in mind that all req object values are strings, so need to convert to numbers
  const totalWorth = Number(numWeeks) * Number(weeklyRevenue);
  if (
    !numWeeks ||
    !weeklyRevenue ||
    isNaN(totalWorth) ||
    totalWorth < 1000000
  ) {
    res.status(400).send('Cannot add idea. Ensure total worth is > 1,000,000');
  } else {
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
