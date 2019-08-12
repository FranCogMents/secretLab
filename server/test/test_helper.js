const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/secretlabs_test', {
    useNewUrlParser: true
  });
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', error);
    });
});

beforeEach(done => {
  const { users, sites } = mongoose.connection.collections;
  users
    .drop()
    .then(() => sites.drop().then(() => done()))
    .catch(() => done());
});
