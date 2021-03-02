
exports.seed = function(knex) {
  return knex('Companies').del()
    .then(function() {
      return knex('Companies').insert([
        {id: 1, URL: 'energyti.me', Name: 'EnergyTime', Socials: 'Instagram.com, Twitter.com', Contact: 'hi@energyti.me'},
        {id: 2, URL: 'saveti.me', Name: 'SaveTime', Socials: 'Instagram.com, Twitter.com', Contact: 'hi@saveti.me'}
      ]);
    });
};
