const test = require('ava')
const { intersection, create, fromPoints, toString } = require('./index')

test('geom3: intersection() should create proper intersection from empty geometries', (t) => {
  const obj1 = create()
  const obj2 = create()
  const obj3 = create()

  // one empty geometry
  const ret1 = intersection(obj1)
  const exp1 = { 
    polygons: [],
    isCanonicalized: true,
    isRetesselated: true
  }
  t.deepEqual(ret1, exp1)

  // two empty geometries
  const ret2 = intersection(obj1, obj2)
  const exp2 = { 
    polygons: [],
    isCanonicalized: false,
    isRetesselated: false
  }
  t.deepEqual(ret2, exp2)

  // three empty geometries
  const ret3 = intersection(obj1, obj2, obj3)
  const exp3 = { 
    polygons: [],
    isCanonicalized: false,
    isRetesselated: false
  }
  t.deepEqual(ret3, exp3)
})

test('geom3: intersection() should create proper intersection from solid geometries', (t) => {
  const box1 = [
                 [ [-5.0, -5.0, -5.0], [-5.0, -5.0, 5.0], [-5.0, 5.0, 5.0], [-5.0, 5.0, -5.0] ],
                 [ [5.0, -5.0, -5.0], [5.0, 5.0, -5.0], [5.0, 5.0, 5.0], [5.0, -5.0, 5.0] ],
                 [ [-5.0, -5.0, -5.0], [5.0, -5.0, -5.0], [5.0, -5.0, 5.0], [-5.0, -5.0, 5.0] ],
                 [ [-5.0, 5.0, -5.0], [-5.0, 5.0, 5.0], [5.0, 5.0, 5.0], [5.0, 5.0, -5.0] ],
                 [ [-5.0, -5.0, -5.0], [-5.0, 5.0, -5.0], [5.0, 5.0, -5.0], [5.0, -5.0, -5.0] ],
                 [ [-5.0, -5.0, 5.0], [5.0, -5.0, 5.0], [5.0, 5.0, 5.0], [-5.0, 5.0, 5.0] ]
               ]

  const box2 = [
                 [ [ 15.0, 15.0, 15.0], [ 15.0, 15.0, 25.0], [ 15.0, 25.0, 25.0], [ 15.0, 25.0, 15.0] ],
                 [ [ 25.0, 15.0, 15.0], [ 25.0, 25.0, 15.0], [ 25.0, 25.0, 25.0], [ 25.0, 15.0, 25.0] ],
                 [ [ 15.0, 15.0, 15.0], [ 25.0, 15.0, 15.0], [ 25.0, 15.0, 25.0], [ 15.0, 15.0, 25.0] ],
                 [ [ 15.0, 25.0, 15.0], [ 15.0, 25.0, 25.0], [ 25.0, 25.0, 25.0], [ 25.0, 25.0, 15.0] ],
                 [ [ 15.0, 15.0, 15.0], [ 15.0, 25.0, 15.0], [ 25.0, 25.0, 15.0], [ 25.0, 15.0, 15.0] ],
                 [ [ 15.0, 15.0, 25.0], [ 25.0, 15.0, 25.0], [ 25.0, 25.0, 25.0], [ 15.0, 25.0, 25.0] ]
               ]

  const box3 = [
                 [ [-5.0, -5.0, 5.0], [-5.0, -5.0, 15.0], [-5.0, 5.0, 15.0], [-5.0, 5.0, 5.0] ],
                 [ [5.0, -5.0, 5.0], [5.0, 5.0, 5.0], [5.0, 5.0, 15.0], [5.0, -5.0, 15.0] ],
                 [ [-5.0, -5.0, 5.0], [5.0, -5.0, 5.0], [5.0, -5.0, 15.0], [-5.0, -5.0, 15.0] ],
                 [ [-5.0, 5.0, 5.0], [-5.0, 5.0, 15.0], [5.0, 5.0, 15.0], [5.0, 5.0, 5.0] ],
                 [ [-5.0, -5.0, 5.0], [-5.0, 5.0, 5.0], [5.0, 5.0, 5.0], [5.0, -5.0, 5.0] ],
                 [ [-5.0, -5.0, 15.0], [5.0, -5.0, 15.0], [5.0, 5.0, 15.0], [-5.0, 5.0, 15.0] ]
               ]

  const box4 = [
                 [ [0.0, 0.0, 0.0], [0.0, 0.0, 10.0], [0.0, 10.0, 10.0], [0.0, 10.0, 0.0] ],
                 [ [10.0, 0.0, 0.0], [10.0, 10.0, 0.0], [10.0, 10.0, 10.0], [10.0, 0.0, 10.0] ],
                 [ [0.0, 0.0, 0.0], [10.0, 0.0, 0.0], [10.0, 0.0, 10.0], [0.0, 0.0, 10.0] ],
                 [ [0.0, 10.0, 0.0], [0.0, 10.0, 10.0], [10.0, 10.0, 10.0], [10.0, 10.0, 0.0] ],
                 [ [0.0, 0.0, 0.0], [0.0, 10.0, 0.0], [10.0, 10.0, 0.0], [10.0, 0.0, 0.0] ],
                 [ [0.0, 0.0, 10.0], [10.0, 0.0, 10.0], [10.0, 10.0, 10.0], [0.0, 10.0, 10.0] ]
               ]

  const obj1 = fromPoints(box1)
  const obj2 = fromPoints(box2)
  const obj3 = fromPoints(box3)
  const obj4 = fromPoints(box4)

  // one solid geometry
  const ret1 = intersection(obj1)
  const exp1 = fromPoints(box1)
  t.deepEqual(ret1, exp1)

  // two non-overlapping geometries
  const ret2 = intersection(obj1, obj2)
  const exp2 = fromPoints([])
  t.deepEqual(ret2, exp2)

  // two touching geometries (faces)
  const ret3 = intersection(obj1, obj3)
  const exp3 = fromPoints([])
  t.deepEqual(ret3, exp3)

  // two overlapping geometries
  const ret4 = intersection(obj1, obj4)
  const exp4 = fromPoints( 
    [
      [[0.0, 0.0, 0.0], [0.0, 0.0, 5.0], [0.0, 5.0, 5.0], [0.0, 5.0, 0.0]],
      [[0.0, 0.0, 0.0], [5.0, 0.0, 0.0], [5.0, 0.0, 5.0], [0.0, 0.0, 5.0]],
      [[0.0, 0.0, 0.0], [0.0, 5.0, 0.0], [5.0, 5.0, 0.0], [5.0, 0.0, 0.0]],
      [[5.0, 0.0, 0.0], [5.0, 5.0, 0.0], [5.0, 5.0, 5.0], [5.0, 0.0, 5.0]],
      [[0.0, 5.0, 0.0], [0.0, 5.0, 5.0], [5.0, 5.0, 5.0], [5.0, 5.0, 0.0]],
      [[0.0, 0.0, 5.0], [5.0, 0.0, 5.0], [5.0, 5.0, 5.0], [0.0, 5.0, 5.0]]
    ]
  )

  t.deepEqual(ret4, exp4)
})


