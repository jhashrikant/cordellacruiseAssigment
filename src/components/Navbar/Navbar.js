import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.png"
import styles from "./Navbar.module.css"
import hambuger from "../../assets/hamburger.png"
const NAV_LINKS = [
  {
    id: 1,
    label: "Offers",
    path: "/"
  },
  {
    id: 2,
    label: "Destinations",
    path: "/"
  },
  {
    id: 3,
    label: "Events",
    path: "/"
  },
  {
    id: 4,
    label: "Ships",
    path: "/"
  },
  {
    id: 5,
    label: "Contacts",
    path: "/"
  }
]

const Navbar = () => {

  const [isActive, setisActive] = useState(false)

  const toggleMenu = () => {
    setisActive((prevActive) => !prevActive)
  }


  return (
    <header>
      <nav className={styles.nav}>

        <Link to={"/"}>
          <img className={styles.logo} src={logo} alt='Cruise logo' />
        </Link>

        <ul className={`${styles.navItems} ${isActive ? styles.active : ""}`}>
          {NAV_LINKS.map(({ id, label, path }) => {
            return (
              <li key={id} className={styles.listitem}>
                <Link to={path}>{label}</Link>
              </li>
            )
          })}
        </ul>
        {/* buttons */}
        <div className={styles.btn__container}>
          <button className={styles.btn}>Find a cruise</button>
          <button className={styles.checkIn}>web check-in</button>
        </div>
        {/* hamburger */}
        <button className={styles.hambuger} onClick={toggleMenu}>
          <img src={hambuger} alt='hamburgerIcon' />
        </button>
      </nav>
    </header>
  )
}

export default Navbar
