
exports.seed = function(knex) {
  return knex('Meetings').del()
    .then(function () {
      return knex('Meetings').insert([
        {id: 1, LeadEmail: '', LeadName: '', LeadCompany: '', StartTime: '1617635745', EndTime: '1617636645', Company: 5},
        {id: 2, LeadEmail: '', LeadName: '', LeadCompany: '', StartTime: '1617636645', EndTime: '1617637500', Company: 5}
      ]);
    });
};
