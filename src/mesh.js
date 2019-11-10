import {vec3, mat4} from 'gl-matrix'


export class Mesh {
  position = vec3.create();
  rotation = vec3.create();
  scale = vec3.fromValues(1, 1, 1);
  geometry = null;
  material = null;
  name = null;

  constructor(opts) {
    Object.assign(this, opts)
  }
}