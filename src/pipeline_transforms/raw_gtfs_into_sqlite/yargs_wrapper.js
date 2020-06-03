const main = require('./index');

const command = 'load_raw_gtfs_into_sqlite';
const desc = 'Load the GTFS files into a SQLite Database.';

const builder = {
  gtfs_zip: {
    desc: 'Path to the GTFS zip archive.',
    type: 'string',
    demand: true
  }
};

const handler = main;

module.exports = {
  command,
  desc,
  builder,
  handler
};