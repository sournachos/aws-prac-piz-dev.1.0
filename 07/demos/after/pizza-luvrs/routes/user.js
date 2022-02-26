module.exports = handlers => ({
  method: 'GET',
  path: '/user/{username?}',
  handler: handlers.user,
  options: {
    auth: {
      mode: 'try'
    },
    log: {
      collect: true
    }
  }
})
