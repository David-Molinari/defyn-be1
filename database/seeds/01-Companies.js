exports.seed = function(knex) {
  return knex('Companies').del()
    .then(function() {
      return knex('Companies').insert([
        {id: 1, URL: 'defyn.co', Contact: 'hi@defyn.co'},
        {id: 2, URL: 'energyti.me', Contact: 'david@energyti.me'},
        {id: 3, URL: 'saleti.me', Contact: 'tommy@saleti.me'}
      ]);
    });
};