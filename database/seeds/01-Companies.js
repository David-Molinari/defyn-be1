exports.seed = function(knex) {
  return knex('Companies').insert([
    {id: 1, URL: 'defyn.co', Name: 'Defyn', Email: 'hi@defyn.co', StripeID: '', VideoOrder: ' 1 3 ', Price: ''},
    {id: 2, URL: 'localhost:3000', Name: 'Development', Email: 'd_mm9152@yahoo.com', StripeID: 'acct_1IgEu0BRD7BJ4mUo', VideoOrder: ' 2 4 ', Price: '1000'}
  ]);
};

// stripe account: acct_1IgEu0BRD7BJ4mUo