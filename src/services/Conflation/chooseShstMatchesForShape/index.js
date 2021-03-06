const computeSubGraphComponentsTraversals = require("./computeSubGraphComponentsTraversals");
const chooseOptimalShstMatches = require("./chooseOptimalShstMatches");

//  The gtfsNetEdgesShstMatches data structure:
//    [
//      {
//        gtfsNetworkEdge: <GeoJSON feature for the GTFS shape segment.>,
//        shstMatches: [...shst match GeoJSON features for the GTFS shape segment.]
//      },
//      ...
//    ]
const chooseShstMatchesForShape = (gtfsNetEdgesShstMatches) => {
  const shstMatchesById = gtfsNetEdgesShstMatches.reduce(
    // This GTFS shape segment's shstMatches.
    (acc, { shstMatches }) => {
      if (shstMatches !== null) {
        // For each Shst match for this GTFS shape segment.
        for (let i = 0; i < shstMatches.length; ++i) {
          const shstMatch = shstMatches[i];

          // Index that shstMatch by it's id (autogenerated by SQLite).
          acc[shstMatch.id] = shstMatch;
        }
      }

      return acc;
    },
    {}
  );

  const subGraphComponentsTraversals = computeSubGraphComponentsTraversals(
    gtfsNetEdgesShstMatches,
    shstMatchesById
  );

  const chosenPaths =
    chooseOptimalShstMatches({
      gtfsNetEdgesShstMatches,
      subGraphComponentsTraversals,
    }) || {};

  return chosenPaths;
};

module.exports = chooseShstMatchesForShape;
