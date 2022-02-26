module.exports = handlers => ({
  method: 'GET',
  path: '/login',
  handler: handlers.login,
  options: {
    auth: {
      mode: 'try'
    },
    log: {
      collect: true
    }
  }
})
