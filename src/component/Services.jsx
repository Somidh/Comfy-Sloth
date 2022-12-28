import React from 'react'



const Services = ({ icon, title, text }) => {
    return (
        <div className='flex flex-col items-center justify-center gap-3'>
            <span>
                <GiCompass />

            </span>
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
    )
}

export default Services
