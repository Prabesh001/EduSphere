import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Google = () => {
    const queryParams = new URLSearchParams(location.search)
    const navigate = useNavigate()
    const token = queryParams.get("token")
    const [loading,setLoading] = useState(true)

useEffect(()=>{
    if(token){
        localStorage.setItem('token',token)
        navigate("/")
    }
},[token])
  return (
    <div>
        <button type="button" class="bg-indigo-500 ..." disabled>
  <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
  </svg>
  Verifying...
</button>

    </div>
  )
}

export default Google