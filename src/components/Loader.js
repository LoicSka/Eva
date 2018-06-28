import React from 'react'

const Loader = () => {
    return (
        <div className='d-flex flex-row justify-content-center align-items-center my-2'>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader
