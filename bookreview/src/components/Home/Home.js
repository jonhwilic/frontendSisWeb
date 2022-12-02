import React from 'react'

const Home = () => {
  return (
    <>
      <div>
        <h1>Bem vindo a nossa plataforma de Resenhas!</h1>
      </div>
      { console.log(localStorage.getItem('user_id')) }
    </>
  )
}

export default Home
