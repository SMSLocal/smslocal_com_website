import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopBar from './TopBar.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Canonical from './Canonical.jsx'
import SiteSchema from './SiteSchema.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

function Layout() {
  useScrollReveal()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="page-shell">
      <Canonical />
      <SiteSchema />
      <TopBar />
      <Navbar />
      <main>
        <Breadcrumbs />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
