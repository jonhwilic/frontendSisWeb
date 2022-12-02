import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import { Wrapper, Form, AddReviewButton } from './styles'
import { darkTheme } from '../../styles/theme'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function AddCategories() {
  const [categories, setCategories] = useState([])
  const history = useHistory()

  const categorias = [
    'Romance',
    'Pedagógico',
    'Biografia',
    'Ciência',
    'Religião',
    'Fantasia e Aventura',
  ]
  const style = {
    option: {
      background: darkTheme.bg3,
      color: darkTheme.text,
    },
    chips: {
      background: darkTheme.bg3,
    },
  }
  const id = localStorage.getItem('user_id')

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/user?id=${id}`)
      .then(function (response) {
        setCategories(response.data.body.user.categorias)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Categorias =====>>>>>>', categories)
    axios
      .put(`http://127.0.0.1:5000/categories`, {
        id: id,
        categorias: categories,
      })
      .then(function (response) {
        console.log(response)
        setCategories(response.data.body.categorias)
        history.push('/categories')
      })
      .catch(function (error) {
        console.error(error)
      })
  }
  return (
    <Wrapper>
      <h2>Lista de Categorias</h2>
      <Form onSubmit={handleSubmit}>
        <Multiselect
          isObject={false}
          onRemove={(e) => {
            setCategories(e)
          }}
          onSelect={(e) => {
            setCategories(e)
          }}
          options={categorias}
          style={style}
        />
        <AddReviewButton
          type='submit'
          fullWidth
          variant='contained'
          color='primary'>
          Create
        </AddReviewButton>
      </Form>
    </Wrapper>
  )
}

export default AddCategories
