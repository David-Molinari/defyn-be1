
exports.seed = function(knex) {
  return knex('Videos').insert([
    {id: 1, Name: 'About', Link: 'https://vimeo.com/190506148', Unpaid: false, Company: 1},
    {id: 2, Name: 'About1', Link: 'https://vimeo.com/358629078', Unpaid: false, Company: 2},
    {id: 3, Name: 'About', Link: 'https://vimeo.com/510614745', Unpaid: false, Company: 3},
    {id: 4, Name: 'About', Link: 'https://vimeo.com/510614745', Unpaid: false, Company: 4},
    {id: 5, Name: 'About', Link: 'https://vimeo.com/510614745', Unpaid: false, Company: 5},
    {id: 6, Name: 'Example', Link: 'https://vimeo.com/192593280', Unpaid: true, Company: 1},
    {id: 7, Name: 'Example1', Link: 'https://vimeo.com/190646235', Unpaid: true, Company: 2},
    {id: 8, Name: 'Example', Link: 'https://vimeo.com/510614745', Unpaid: true, Company: 3},
    {id: 9, Name: 'Example', Link: 'https://vimeo.com/510614745', Unpaid: true, Company: 4},
    {id: 10, Name: 'Example', Link: 'https://vimeo.com/510614745', Unpaid: true, Company: 5},
  ]);
};
