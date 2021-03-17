exports.seed = function(knex) {
  return knex('Companies').del()
    .then(function() {
      return knex('Companies').insert([
        {id: 1, URL: 'defyn.co', Name: 'Defyn'},
        {id: 2, URL: 'energyti.me', Name: 'EnergyTime'},
        {id: 3, URL: 'saleti.me', Name: 'SaleTime'},
        {id: 4, URL: 'efficientie.com', Name: 'Efficientie'},
        {id: 5, URL: 'localhost:3000', Name: 'Development'}
      ]);
    });
};