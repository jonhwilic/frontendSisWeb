import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Wrapper,
  AddCategoryButton,
  DeleteCategoryButton,
  Table,
  TableTd,
  TableTr,
} from './styles'
import axios from 'axios'

export default function CategoryTable() {
  const history = useHistory()
  const [category, setCategory] = useState([])
  useEffect(() => {
    const id = localStorage.getItem('user_id')

    setTimeout(function () {
      axios
        .get(`http://127.0.0.1:5000/user?id=${id}`)
        .then(function (response) {
          setCategory(response.data.body.user.categorias)
        })
        .catch(function (error) {
          console.error(error)
        })
    }, 1000)
  }, [category])

  const CategoryDelete = (categoria) => {
    const id = localStorage.getItem('user_id')
    const newArray = []

    category.map((cat) => {
      if (cat !== categoria) {
        newArray.push(cat)
      }
    })

    axios
      .put(`http://127.0.0.1:5000/categories`, {
        id: id,
        categorias: newArray,
      })
      .then(function (response) {
        console.log(response)
        setCategory(response.data.body.user.categorias)

      })
      .catch(function (error) {
        console.error(error)
      })
  }
  return (
    <>
      <Wrapper>
        <AddCategoryButton onClick={() => history.push('/addCategory')}>
          Adicionar
        </AddCategoryButton>
        <Table>
          <TableTr>
            <th>Categorias</th>
            <th>Ações</th>
          </TableTr>

          {category.map((categoria) => (
            <TableTr>
              <TableTd>{categoria}</TableTd>
              <TableTd>
                <DeleteCategoryButton onClick={() => CategoryDelete(categoria)}>
                  Deletar
                </DeleteCategoryButton>
              </TableTd>
            </TableTr>
          ))}
        </Table>
      </Wrapper>
    </>
  )
}
