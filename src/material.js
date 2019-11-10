
export class Material {
  color = {r: 0, g: 0, b: 0}
  selfLuminous = 0

  constructor(opts) {
    Object.assign(this, opts)
  }
}
