
exports.seed = function(knex) {
  return knex('Companies').del()
    .then(function() {
      return knex('Companies').insert([
        {id: 1, URL: 'energyti.me', Name: 'EnergyTime', Contact: 'hi@energyti.me'},
        {id: 2, URL: 'saveti.me', Name: 'SaveTime', Contact: 'hi@saveti.me'}
      ]);
    });
};
