exports.seed = function(knex) {
  return knex('Companies').insert([
    {id: 1, URL: 'davidmolinari.me', Name: 'David Molinari', Email: 'david.m.molinari@gmail.com', StripeID: '', VideoOrder: ' 1 ', Price: ''}
  ]);
};