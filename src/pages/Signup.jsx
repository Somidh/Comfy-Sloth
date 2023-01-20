import React, { useState } from 'react'
import { supabase } from '../supabaseClient'


const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })


  console.log(formData)
  const handleChange = (event) => {
    setFormData(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  }


  const handleSubmit = async (e) => {

    e.preventDefault()
    try {

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          }
        }
      })
      alert('Check email for verification link')


    } catch (error) {
      alert(error)
    }

  }

  return (
    <div className='  my-[20em] '>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-full gap-2'>
        <input type="text" name="fullName" placeholder='FullName' />
        <input onClick={handleChange} name='email' type="email" placeholder='Email' className='border-2' />
        <input type="password" placeholder='Password' className='border-2' />
        <button onClick={handleChange} name='password' type='submit' className='bg-[skyblue] px-5 py-2'>Submit</button>
      </form>
    </div>
  )
}

export default Signup
