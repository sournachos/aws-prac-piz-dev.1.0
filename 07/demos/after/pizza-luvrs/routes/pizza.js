module.exports = handlers => ({
  method: 'GET',
  path: '/pizza/{pizzaId}',
  handler: handlers.pizza,
  options: {
    auth: {
      mode: 'try'
    },
    log: {
      collect: true
    }
  }
})
