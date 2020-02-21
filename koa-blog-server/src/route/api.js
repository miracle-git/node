const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Koa2 Blog APIs!'
  });
});

module.exports = router;
