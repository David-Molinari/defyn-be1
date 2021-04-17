exports.seed = function(knex) {
  return knex('Companies').insert([
    {id: 1, URL: 'defyn.co', Name: 'Defyn', Email: 'hi@defyn.co', StripeID: '', VideoOrder: ' 1 6 ', Type: 1},
    {id: 2, URL: 'energyti.me', Name: 'EnergyTime', Email: 'hi@energyti.me', StripeID: '', VideoOrder: ' 2 7 ', Type: 2},
    {id: 3, URL: 'saleti.me', Name: 'SaleTime', Email: 'hi@saleti.me', StripeID: '', VideoOrder: ' 3 8 ', Type: 5},
    {id: 4, URL: 'efficientie.com', Name: 'Efficientie', Email: 'hi@efficientie.com', StripeID: '', VideoOrder: ' 4 9 ', Type: 2},
    {id: 5, URL: 'localhost:3000', Name: 'Development', Email: 'd_mm9152@yahoo.com', StripeID: 'acct_1IgEu0BRD7BJ4mUo', VideoOrder: ' 5 10 ', Type: 3}
  ]);
};