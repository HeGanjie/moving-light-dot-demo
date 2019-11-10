import React from 'react';
import useFetch from "react-fetch-hook";
import './App.css'
import Regl, { Draw } from 'react-regl';
import mainVertUrl from './main.vert'
import mainFragUrl from './main.frag'

let rawLoaderFetcherOpts = {
  formatter: (response) => response.text()
}

function App() {
  const { data: mainVert } = useFetch(mainVertUrl, rawLoaderFetcherOpts);
  const { data: mainFrag } = useFetch(mainFragUrl, rawLoaderFetcherOpts);
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
      <Draw
        vert={mainVert}
        frag={mainFrag}
        attributes={{
          position: [[-0.5, 0],[0, -0.5],[0.25, 1]]
        }}
        uniforms={{
          color: [1,1,0.5,1]
        }}
        count={3}
      />
    </Regl >
  );
}

export default App;
