exports.seed = function(knex) {
  return knex('Companies').insert([
    {id: 1, URL: 'defyn.co', Name: 'Defyn', Email: 'hi@defyn.co', StripeID: '', VideoOrder: ' 1 6 ', Price: ''},
    {id: 2, URL: 'energyti.me', Name: 'EnergyTime', Email: 'hi@energyti.me', StripeID: '', VideoOrder: ' 2 7 ', Price: ''},
    {id: 3, URL: 'saleti.me', Name: 'SaleTime', Email: 'hi@saleti.me', StripeID: '', VideoOrder: ' 3 8 ', Price: ''},
    {id: 4, URL: 'efficientie.com', Name: 'Efficientie', Email: 'hi@efficientie.com', StripeID: '', VideoOrder: ' 4 9 ', Price: ''},
    {id: 5, URL: 'localhost:3000', Name: 'Development', Email: 'd_mm9152@yahoo.com', StripeID: '', VideoOrder: ' 10 5 ', Price: ''}
  ]);
};

// stripe account: acct_1IgEu0BRD7BJ4mUo