import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../supabaseClient'


const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })


  const navigate = useNavigate()

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
      if (error) throw error
      alert('Check email for verification link')


    } catch (error) {
      alert(error)
    }

  }


  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <div className='  my-[20em] flex flex-col items-center gap-10'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-full gap-2'>
        <input
          onChange={handleChange}
          name="fullName"
          placeholder='Full name'
          className='border-2 p-2'
        />

        <input
          onChange={handleChange}
          name='email'
          placeholder='Email'
          className='border-2 p-2' />
        <input
          onChange={handleChange}
          name='password'
          type="password"
          placeholder='Password'
          className='border-2 p-2' />

        <button
          name='password'
          type='submit'
          className='bg-[#ab7a5f] text-white tracking-widest px-5 py-2 '>Submit</button>
      </form>
      <p>Already have an account? <span onClick={goToLogin} className='cursor-pointer ' >Login.</span></p>
    </div>
  )
}

export default Signup
