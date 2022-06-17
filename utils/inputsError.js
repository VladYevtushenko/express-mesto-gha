module.exports.inputsError = (err) => Object.keys(err.errors)
  .map((e) => `${e} - ${err.errors[e].properties.message}`)
  .join(', ');
