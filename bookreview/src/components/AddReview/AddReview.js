import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import { Wrapper, AddReviewButton, Form, P, Select, Input } from './styles'

export default function AddReview() {
  const id = localStorage.getItem('user_id')
  const [categoria, setCategoria] = useState('')
  const [review, setReview] = useState('')
  const [title, setTitle] = useState('')
  const history = useHistory()
  const [categorias, setCategorias] = useState([])

  const CadastrarReview = (e) => {
    e.preventDefault()
    console.log(review)
    if (categoria !== '') {
      axios
        .post(`http://127.0.0.1:5000/review`, {
          id: id,
          review: {
            title: title,
            review: review,
            categoria: categoria,
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
        setCategorias(response.data.body.user.categorias)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])

  return (
    <>
      <Wrapper>
        <Form onSubmit={CadastrarReview}>
          <P>Título do Livro</P>
          <Input
            type='text'
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          <P>Review</P>
          <Input
            type='text'
            onChange={(e) => {
              setReview(e.target.value)
            }}
          />
          <Select
            onChange={(e) => {
              setCategoria(e.target.value)
            }}>
            <option selected disabled>
              Selecione
            </option>
            {categorias.map((categoria) => (
              <option value={categoria}>{categoria}</option>
            ))}
          </Select>
            <AddReviewButton>
              Adicionar
            </AddReviewButton>
        </Form>
      </Wrapper>
    </>
  )
}
