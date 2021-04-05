exports.seed = function(knex) {
  return knex('Companies').insert([
    {id: 1, URL: 'defyn.co', Name: 'Defyn', Type: 1},
    {id: 2, URL: 'energyti.me', Name: 'EnergyTime', Type: 2},
    {id: 3, URL: 'saleti.me', Name: 'SaleTime', Type: 5},
    {id: 4, URL: 'efficientie.com', Name: 'Efficientie', Type: 2},
    {id: 5, URL: 'localhost:3000', Name: 'Development', Type: 3}
  ]);
};