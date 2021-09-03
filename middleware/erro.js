module.exports = (err, req, res, next) => {
  console.error('ERROR =>', err)
  res.status(500).send('Something failed.')
  next()
}
