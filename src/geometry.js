import {vec3} from 'gl-matrix'


export class Geometry {
  vertices = null
  normals = null
  faces = null

  constructor(opts) {
    Object.assign(this, opts)
  }

  static PlaneGeometry = new Geometry({
    vertices: [
      vec3.fromValues(-0.5, -0.5, 0),
      vec3.fromValues(0.5, -0.5, 0),
      vec3.fromValues(-0.5, 0.5, 0),
      vec3.fromValues(0.5, 0.5, 0)
    ],
    normals: [
      vec3.fromValues(0, 0, 1)
    ],
    faces: [
      {
        data:  [{V: 0, N: 0}, {V: 2, N: 0}, {V: 3, N: 0}, {V: 1, N: 0}],
        triangleIndices: [2, 3, 0, 0, 1, 2]
      }
    ]
  })

}
