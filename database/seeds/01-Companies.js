exports.seed = function(knex) {
  return knex('Companies').insert([
    {id: 1, URL: 'defyn.co', Name: 'Defyn', Email: 'hi@defyn.co', StripeID: '', Type: 1},
    {id: 2, URL: 'energyti.me', Name: 'EnergyTime', Email: 'hi@energyti.me', StripeID: '', Type: 2},
    {id: 3, URL: 'saleti.me', Name: 'SaleTime', Email: 'hi@saleti.me', StripeID: '', Type: 5},
    {id: 4, URL: 'efficientie.com', Name: 'Efficientie', Email: 'hi@efficientie.com', StripeID: '', Type: 2},
    {id: 5, URL: 'localhost:3000', Name: 'Development', Email: 'd_mm9152@yahoo.com', StripeID: 'acct_1IgEu0BRD7BJ4mUo', Type: 3}
  ]);
};