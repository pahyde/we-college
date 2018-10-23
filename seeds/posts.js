
exports.seed = function(knex, Promise) {
  return knex('posts').del()
    .then(function () {
      return knex('posts').insert([
        {
          id: 1,
          userid: 1,
          title: 'Trouble understanding nested for loops',
          description: 'Hey guys! I\'m having some trouble understanding nested loops. Does it matte...',
          program: 'public class {\n\n}',
          stdin: '',
          category: 'code',
          likes: 2,
          comments: 0,
          created: (new Date()).toISOString(),
          updated: (new Date()).toISOString()
        }
      ]);
    });
};
