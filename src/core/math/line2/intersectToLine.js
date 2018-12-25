const vec2 = require('../vec2')
const { solve2Linear } = require("../../utils/various")

/**
 * Return the point of intersection between the given lines
 *
 * The point will have Infinity values if the lines are paralell.
 * The point will have NaN values if the lines are the same.
 *
 * @return {vec2} point of intersection
 */
const intersectToLine = (line1, line2) => {
  let point = solve2Linear(line1[0], line1[1], line2[0], line2[1], line1[2], line2[2])
  point = vec2.clone(point)
  return point
}

module.exports = intersectToLine
