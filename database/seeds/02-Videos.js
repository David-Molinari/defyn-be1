exports.seed = function(knex) {
  return knex('Videos').insert([
    {id: 1, Name: 'About', Link: 'https://vimeo.com/192511901', Unpaid: true, Company: 1},
  ]);
};