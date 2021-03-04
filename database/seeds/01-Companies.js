exports.seed = function(knex) {
  return knex('Companies').del()
    .then(function() {
      return knex('Companies').insert([
        {id: 1, URL: 'energyti.me', Contact: 'david@energyti.me'},
        {id: 2, URL: 'saleti.me', Contact: 'tommy@saleti.me'}
      ]);
    });
};