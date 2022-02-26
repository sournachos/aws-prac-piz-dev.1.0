module.exports = handlers => ({
  method: 'GET',
  path: '/',
  handler: handlers.main,
  options: {
    auth: {
      mode: 'try'
    },
    log: {
      collect: true
    }
  }
})
