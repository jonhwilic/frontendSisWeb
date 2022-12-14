import styled from 'styled-components'

import { v } from '../../styles/variables'

export const SLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

export const SMain = styled.main`
  padding: calc(${v.smSpacing} * 2);

  h1 {
    font-size: 36px;
    color: black;
  }
`
