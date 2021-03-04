
exports.seed = function(knex) {
  return knex('Videos').del()
    .then(function () {
      return knex('Videos').insert([
        {id: 1, Name: 'About', Link: 'https://vimeo.com/510614745', Alt: 'This is the alt text...', Company: 1},
        {id: 2, Name: 'About', Link: 'https://vimeo.com/510614745', Alt: 'This is the alt text...', Company: 2},
        {id: 3, Name: 'About', Link: 'https://vimeo.com/510614745', Alt: 'This is the alt text...', Company: 3},
        {id: 4, Name: 'Example', Link: 'https://vimeo.com/506575905', Alt: 'This is the alt text...', Company: 2},
        {id: 5, Name: 'Example', Link: 'https://vimeo.com/506575905', Alt: 'This is the alt text...', Company: 3},
      ]);
    });
};
