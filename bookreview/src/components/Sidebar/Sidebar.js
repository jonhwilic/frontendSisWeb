import React, { useState } from 'react'
import {
  SDivider,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  SSidebar,
  SSidebarButton,
  SLoggout,
} from './styles'

import { AiOutlineLeft } from 'react-icons/ai'
import {
  MdLogout,
  MdLibraryBooks,
  MdOutlineMailOutline,
} from 'react-icons/md'

import { useLocation } from 'react-router-dom'

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { pathname } = useLocation()

  return (
    <SSidebar isOpen={sidebarOpen}>
      <>
        <SSidebarButton
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen((p) => !p)}>
          <AiOutlineLeft />
        </SSidebarButton>
      </>

      {linksArray.map(({ icon, label, to }) => (
        <SLinkContainer key={label} isActive={pathname === to}>
          <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
            <SLinkIcon>{icon}</SLinkIcon>
            {sidebarOpen && (
              <>
                <SLinkLabel>{label}</SLinkLabel>
              </>
            )}
          </SLink>
        </SLinkContainer>
      ))}
      <SDivider />
      <SLoggout>
        {secondaryLinksArray.map(({ icon, label, to }) => (
          <SLinkContainer key={label}>
            <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
              <SLinkIcon>{icon}</SLinkIcon>
              {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
            </SLink>
          </SLinkContainer>
        ))}
      </SLoggout>
    </SSidebar>
  )
}

const linksArray = [
  {
    label: 'Resenhas',
    icon: <MdOutlineMailOutline />,
    to: '/review',
  },
  {
    label: 'Categorias de Livros',
    icon: <MdLibraryBooks />,
    to: '/categories',
  },
]

const secondaryLinksArray = [
  {
    label: 'Sair',
    icon: <MdLogout />,
    to: '/',
  },
]

export default Sidebar
