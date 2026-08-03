import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopBar from './TopBar.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Canonical from './Canonical.jsx'
import SiteSchema from './SiteSchema.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { stripSlash } from '../lib/url.js'

function Layout() {
  useScrollReveal()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // First path segment, so a section can style chrome that renders outside its
  // own pages — the breadcrumb strip sits here in Layout, not in the page.
  const section = stripSlash(pathname).split('/')[1] || 'home'

  return (
    <div className="page-shell" data-section={section}>
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
