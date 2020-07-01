const ConflationMapDAO = require('./ConflationMapDAO');

// DAOs are singletons.
let dao;

const getDAO = () => {
  if (dao) {
    return dao;
  }

  dao = new ConflationMapDAO();
  return dao;
};

module.exports = {
  getDAO
};