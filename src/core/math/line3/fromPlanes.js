const vec3 = require('../vec3')

const { EPS } = require('../../constants')
const { solve2Linear } = require("../../utils/various")

const fromData = require('./fromData')

const fromPlanes = (plane1, plane2) => {
  let direction = vec3.cross(plane1, plane2)
  let length = vec3.length(direction)
  if (length < EPS) {
    throw new Error('parallel planes do not intersect')
  }
  length = (1.0 / length)
  direction = vec3.scale(length, direction)

  let absx = Math.abs(direction[0])
  let absy = Math.abs(direction[1])
  let absz = Math.abs(direction[2])
  let origin
  if ((absx >= absy) && (absx >= absz)) {
    // find a point p for which x is zero
    let r = solve2Linear(plane1[1], plane1[2], plane2[1], plane2[2], plane1[3], plane2[3])
    origin = vec3.fromValues(0, r[0], r[1])
  } else if ((absy >= absx) && (absy >= absz)) {
    // find a point p for which y is zero
    let r = solve2Linear(plane1[0], plane1[2], plane2[0], plane2[2], plane1[3], plane2[3])
    origin = vec3.fromValues(r[0], 0, r[1])
  } else {
    // find a point p for which z is zero
    let r = solve2Linear(plane1[0], plane1[1], plane2[0], plane2[1], plane1[3], plane2[3])
    origin = vec3.fromValues(r[0], r[1], 0)
  }
  return fromData(origin, direction)
}

module.exports = fromPlanes
