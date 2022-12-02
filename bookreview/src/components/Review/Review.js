import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Wrapper,
  AddReviewButton,
  DeleteReviewButton,
  Table,
  TableTd,
  TableTr,
} from './styles'

export default function Review() {
  const [reviews, setReviews] = useState([])
  const history = useHistory()

  useEffect(() => {
    setTimeout(function () {
      axios
        .get(`http://127.0.0.1:5000/user?id=${localStorage.getItem('user_id')}`)
        .then(function (response) {
          setReviews(response.data.body.user.reviews)
        })
        .catch(function (error) {
          console.error(error)
        })
    }, 1000)
  }, [reviews])

  const deletarReview = (review_id) => {
    console.log(review_id)
    axios
      .delete(
        `http://127.0.0.1:5000/review?id=${localStorage.getItem(
          'user_id'
        )}&id_review=${review_id}`
      )
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  return (
    <>
      <Wrapper>
        <AddReviewButton onClick={() => history.push('/addReview')}>
          Adicionar
        </AddReviewButton>
        <Table>
          <TableTr>
            <th>Título do Livro</th>
            <th>Resenha</th>
            <th>Categoria</th>
            <th>Ações</th>
          </TableTr>
          {reviews.map((review) => (
            <TableTr key={review.id_review}>
              <TableTd>{review.title}</TableTd>
              <TableTd>{review.review}</TableTd>
              <TableTd>{review.categoria}</TableTd>
              <TableTd>
                <DeleteReviewButton
                  onClick={() => {
                    console.log(review)
                    deletarReview(review.id_review)
                  }}>
                  Deletar
                </DeleteReviewButton>
              </TableTd>
            </TableTr>
          ))}
        </Table>
      </Wrapper>
    </>
  )
}
