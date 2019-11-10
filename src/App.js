import React, {useEffect, useState} from 'react'
import useFetch from 'react-fetch-hook'
import './App.css'
import Regl from 'react-regl'
import mainVertUrl from './main.vert'
import mainFragUrl from './main.frag'
import {DrawScene} from './scene'
import {vec3} from 'gl-matrix'
import {Mesh} from './mesh'
import {Geometry} from './geometry'
import {Material} from './material'

let rawLoaderFetcherOpts = {
  formatter: (response) => response.text()
}

function App() {
  const { data: mainVert } = useFetch(mainVertUrl, rawLoaderFetcherOpts);
  const { data: mainFrag } = useFetch(mainFragUrl, rawLoaderFetcherOpts);

  const [camera, setCamera] = useState(() => ({
    position: vec3.fromValues(0, 0, 10),
    target: vec3.fromValues(0, 0, 0),
    fovY: Math.PI / 2,
    aspect:  window.innerWidth / window.innerHeight,
    near: 1,
    far: 20
  }))
  const [meshes, setMeshes] = useState(() => {
    return [
      new Mesh({
        name: 'Ground',
        geometry: Geometry.PlaneGeometry,
        material: new Material({color: {r: 0.5, g: 0.5, b: 0.5}}),
        scale: vec3.fromValues(10, 10, 1)
      }),
      new Mesh({
        name: 'triangle',
        geometry: new Geometry({
          vertices: [
            vec3.fromValues(-0.5, 0, 0),
            vec3.fromValues(0, 0.5, 0),
            vec3.fromValues(0.5, 0, 0),
          ],
          normals: [
            vec3.fromValues(0, 0, 1)
          ],
          faces: [
            {
              data:  [{V: 0, N: 0}, {V: 1, N: 0}, {V: 2, N: 0}],
              triangleIndices: [0, 1, 2]
            }
          ]
        }),
        material: new Material({color: {r: 1, g: 1, b: 0.5}, selfLuminous: 100}),
        position: vec3.fromValues(0, 1, 0)
      })
    ]
  })

  useEffect(() => {
    const startAt = Date.now()
    const timerId = setInterval(() => {
      const elapse = Date.now() - startAt
      let theta = elapse / 1000
      let next = [...meshes]
      next[1].position = vec3.fromValues(5 * Math.cos(theta), 5 * Math.sin(theta), 0.1)
      setMeshes(next)
    }, 1000/30)
    return function () {
      clearInterval(timerId)
    }
  }, [])

  if (!mainVert || !mainFrag) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <Regl
      width={window.innerWidth}
      height={window.innerHeight}
      color={[0, 0, 0, 1]}
    >
      <DrawScene
        mainVert={mainVert}
        mainFrag={mainFrag}
        camera={camera}
        meshes={meshes}
      />
    </Regl>
  );
}

export default App;
