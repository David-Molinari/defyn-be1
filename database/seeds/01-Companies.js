exports.seed = function(knex) {
  return knex('Companies').insert([
    {id: 1, URL: 'defyn.co', Name: 'Defyn', Email: 'david.m.molinari@gmail.com', StripeID: '', VideoOrder: ' 1 ', Price: ''}
  ]);
};