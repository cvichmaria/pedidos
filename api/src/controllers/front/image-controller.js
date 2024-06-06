exports.getImage = (req, res) => {
  const fileName = req.params.filename

  const options = {
    root: __dirname + '../../../storage/images/resize',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  res.sendFile(fileName, options)
}