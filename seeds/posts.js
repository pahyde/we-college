
exports.seed = function(knex, Promise) {
  return knex('posts').del()
    .then(function () {
      return knex('posts').insert([
        {
          user: 'some_user',
          title: 'Trouble understanding nested for loops',
          description: 'Hey guys! I\'m having some trouble understanding nested loops. Does it matte...',
          category: 'code',
          likes: 2,
          comments: 0,
          created: (new Date()).toISOString(),
          updated: (new Date()).toISOString()
        },
        {
          user: 'another_user',
          title: 'Objects vs Classes. What exactly is the difference?',
          description: 'Hey guys! How exactly are classes different than objects. It seems like they\'r..',
          category: 'general',
          likes: 1,
          comments: 3,
          created: (new Date()).toISOString(),
          updated: (new Date()).toISOString()
        }
      ]);
    });
};
