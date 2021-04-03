
exports.seed = function(knex) {
  return knex('Meetings').del()
    .then(function () {
      return knex('Meetings').insert([
        {id: 1, LeadEmail: '', LeadName: '', LeadCompany: '', StartTime: '1617128731015', EndTime: '1617128731025', Company: 5},
        {id: 2, LeadEmail: '', LeadName: '', LeadCompany: '', StartTime: '1617128731055', EndTime: '1617128731075', Company: 5}
      ]);
    });
};
