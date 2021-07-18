import React from 'react'

import ReactLoader from "react-loader-spinner";

const Loader = () => {
    return (
        <div>
            <ReactLoader
        type="BallTriangle"
        color="#5db802"
        height={100}
        width={100}
        
      />
        </div>
    )
}

export default Loader
