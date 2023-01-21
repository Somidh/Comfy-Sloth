import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import useProductStore from '../store/productStore'
import { supabase } from '../supabaseClient'


const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
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

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      if (error) throw error
      console.log(data)
      setToken(data)
      navigate('/')

    } catch (error) {
      alert(error)
    }

  }
  const goToSignUp = () => {
    navigate('/signup')
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-full gap-2'>
        <input
          onChange={handleChange}
          name='email'
          placeholder='Email'
          className='border-2' />
        <input
          onChange={handleChange}
          name='password'
          type="password"
          placeholder='Password'
          className='border-2' />

        <button
          name='password'
          type='submit'
          className='bg-[skyblue] px-5 py-2'>Submit</button>
      </form>
      <p> Don't have an account? <span onClick={goToSignUp} className='cursor-pointer'> signUp</span></p>
    </div>
  )

}

export default Login
