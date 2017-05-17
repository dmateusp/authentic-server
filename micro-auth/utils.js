module.exports = {
  // to merge multiple objects into one
  merge: (objects) => {
    let out = {}
    for (let i = 0; i < objects.length; i++) {
      for (let p in objects[i]) {
        out[p] = objects[i][p]
      }
    }
    return out
  }
}
