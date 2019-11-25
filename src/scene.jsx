import React, {useMemo} from 'react'
import {Draw} from 'react-regl'
import {vec3, mat4, quat} from 'gl-matrix'
import _ from 'lodash'


export function DrawScene(props) {
  const {mainVert, mainFrag, camera, meshes} = props
  const {position, target, fovY, aspect, near, far} = camera
  let w2c = useMemo(() => mat4.lookAt(mat4.create(), position, target, vec3.fromValues(0, 1, 0)), [position, target])
  let mProj = useMemo(() => mat4.perspective(mat4.create(), fovY, aspect, near, far), [fovY, aspect, near, far])
  let proj_w2c = useMemo(() => mat4.multiply(mat4.create(), mProj, w2c), [w2c, mProj])

  return (
    <React.Fragment>
      {meshes.map((mesh, idx) => {
        const {position, rotation, scale, material, geometry} = mesh
        const {color} = material
        const {faces, vertices} = geometry;

        let qRot = quat.fromEuler(quat.create(), ...rotation)
        let mTransform = mat4.fromRotationTranslationScale(mat4.create(), qRot, position, scale);

        let posData = _.flatMap(faces, f => _.flatMap(f.data, ({V}) => [...vertices[V]]))
        let colorData = _.flatMap(faces, f => _.flatMap(f.data, () => {
          return [color.r, color.g, color.b]
        }))
        let elements = _.flatMap(faces, (f, fIdx) => {
          let offset = faces.reduce((acc, currFace, i) => i < fIdx ? acc + currFace.data.length : acc, 0)
          return f.triangleIndices.map(ti => ti + offset)
        })
        return (
          <Draw
            key={idx}
            vert={mainVert}
            frag={mainFrag}
            attributes={{
              a_position: posData,
              a_color: colorData
            }}
            elements={elements}
            uniforms={{
              u_mvp: mesh.name !== 'triangle'
                ? mat4.multiply(mat4.create(), proj_w2c, mTransform)
                : ({tick}) => {
                  let theta = tick / 100
                  let rotation0 = vec3.fromValues(0, 0, theta % (2 * Math.PI) * 180 / Math.PI)
                  let position0 = vec3.fromValues(5 * Math.cos(theta), 5 * Math.sin(theta), 0.1)

                  let qRot = quat.fromEuler(quat.create(), ...rotation0)
                  let mTransform = mat4.fromRotationTranslationScale(mat4.create(), qRot, position0, scale);
                  return mat4.multiply(mat4.create(), proj_w2c, mTransform)
                }
            }}
          />
        )
      })}
    </React.Fragment>
  )
}
