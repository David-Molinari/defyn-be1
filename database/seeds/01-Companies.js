
exports.seed = function(knex) {
  return knex('Companies').del()
    .then(function() {
      return knex('Companies').insert([
        {id: 1, URL: 'energyti.me', Socials: '@energyti_me'},
        {id: 2, URL: 'saveti.me', Socials: '@saveti_me'}
      ]);
    });
};
