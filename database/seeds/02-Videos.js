
exports.seed = function(knex) {
  return knex('Videos').insert([
    {id: 1, Name: 'About', Link: 'https://vimeo.com/190506148', Unpaid: true, Company: 1},
    {id: 2, Name: 'About', Link: 'https://vimeo.com/510614745', Unpaid: true, Company: 2},
    {id: 3, Name: 'Example', Link: 'https://vimeo.com/192593280', Unpaid: true, Company: 1},
    {id: 4, Name: 'Example', Link: 'https://vimeo.com/510614745', Unpaid: true, Company: 2}
  ]);
};
