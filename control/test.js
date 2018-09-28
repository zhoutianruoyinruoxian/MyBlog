module.exports = async (ctx) => {
  console.log(ctx.session.userInfo,22);
  ctx.body='ok'
}