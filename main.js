// #region general utils
const getRange = length => [...Array(length).keys()]
const getRandomFrom = array => array[Math.floor(Math.random() * array.length)]
const getWithoutLastElement = array => array.slice(0, array.length - 1)
const getLastElement = array => array[array.length - 1]
const areEqual = (one, another) => Math.abs(one - another) < 0.000000000001
// #endregion

// #region geometry
class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  scaleBy(number) {
    return new Vector(this.x * number, this.y * number);
  }

  add({ x, y }) {
    return new Vector(this.x + x, this.y + y)
  }

  subtract({ x, y }) {
    return new Vector(this.x - x, this.y - y)
  }

  length() {
    return Math.hypot(this.x, this.y)
  }

  normalize() {
    return this.scaleBy(1 / this.length())
  }

  isOpposite(vector) {
    const { x, y } = this.add(vector)
    return areEqual(x, 0) && areEqual(y, 0)
  }

  equalTo({ x, y }) {
    return areEqual(this.x, x) && areEqual(this.y, y)
  }
}

class Segment {
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  getVector() {
    return this.end.subtract(this.start)
  }

  length() {
    return this.getVector().length()
  }

  isPointInside(point) {
    const first = new Segment(this.start, point)
    const second = new Segment(point, this.end)
    return areEqual(this.length(), first.length() + second.length())
  }

  getProjectedPoint({ x, y }) {
    const { start, end } = this
    const { x: px, y: py } = end.subtract(start)
    const u = ((x - start.x) * px + (y - start.y) * py) / (px * px + py * py)
    return new Vector(start.x + u * px, start.y + u * py)
  }
}

const getSegmentsFromVectors = vectors => getWithoutLastElement(vectors)
  .map((one, index) => new Segment(one, vectors[index + 1]))
// #endregion

// #region constants
// #endregion

// #region game core
// #endregion

// #region rendering
// #endregion

// #region main
// #endregion
