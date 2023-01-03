import React from 'react'
import Header from '../component/Header'
import hero2 from '../assests/hero-2.jpeg'


const About = () => {

  return (
    <div className='w-full h-full'>
      <Header title="About" />
      <div className='grid grid-cols-0 lg:grid-cols-2 items-center justify-center mx-auto px-10 lg:px-5 max-w-[85em] gap-20 mb-20'>
        <img src={hero2} alt="About image" className='h-[500px] w-full  object-cover' />
        <div className='flex flex-col items-start justify-center gap-8'>
          <div>
            <h1 className='text-[#102A42] text-3xl md:text-[2.5rem] font-bold tracking-widest mb-2'>Our Story</h1>
            <div className='bg-[#AB7A5F] w-24 h-1' />
          </div>
          <p className='text-[#617D98] leading-8 mx-auto '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat accusantium sapiente tempora sed dolore esse deserunt eaque excepturi, delectus error accusamus vel eligendi, omnis beatae. Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque dolore, obcaecati incidunt sequi blanditiis est exercitationem molestiae delectus saepe odio eligendi modi porro eaque in libero minus unde sapiente consectetur architecto. Ullam rerum, nemo iste ex, eaque perspiciatis nisi, eum totam velit saepe sed quos similique amet. Ex, voluptate accusamus nesciunt totam vitae esse iste.</p>
        </div>
      </div>
    </div>
  )
}

export default About
