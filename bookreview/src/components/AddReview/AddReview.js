import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import { Wrapper, AddReviewButton, Form, P, Select, Input } from './styles'

export default function AddReview() {
  const id = localStorage.getItem('user_id')
  const [materia, setMateria] = useState('')
  const [pergunta, setPergunta] = useState('')
  const history = useHistory()
  const [materias, setMaterias] = useState([])

  const CadastrarDuvida = (e) => {
    e.preventDefault()
    console.log(pergunta)
    if (materia !== '') {
      axios
        .post(`http://127.0.0.1:5000/duvida`, {
          id: id,
          duvida: {
            pergunta: pergunta,
            materia: materia,
          },
        })
        .then(function (response) {
          history.push('/review')
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/user?id=${id}`)
      .then(function (response) {
        setMaterias(response.data.body.user.materias)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])

  return (
    <>
      <Wrapper>
        <Form onSubmit={CadastrarDuvida}>
          <P>Resenha</P>
          <Input
            type='text'
            onChange={(e) => {
              setPergunta(e.target.value)
            }}
          />
          <Select
            onChange={(e) => {
              setMateria(e.target.value)
            }}>
            <option selected disabled>
              Selecione
            </option>
            {materias.map((materia) => (
              <option value={materia}>{materia}</option>
            ))}
          </Select>
          <AddReviewButton>Adicionar</AddReviewButton>
        </Form>
      </Wrapper>
    </>
  )
}
