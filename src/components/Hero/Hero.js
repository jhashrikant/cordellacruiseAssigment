import React from 'react'
import styles from "./Hero.module.css"
import heroImg from "../../assets/Designer 1.png"
import textImg from "../../assets/Group 1171276753.png"
import arrowImg from "../../assets/Group 1171277276.png"
const Hero = () => {
  return (
    <section className={styles.hero}>
      <img className={styles.heroImg} src={heroImg} alt='heroImg' />
      <img className={styles.textImg} src={textImg} alt='10percentoff img' />
      <img src={arrowImg} className={styles.arrowImg} alt='arrow Img' />
    </section>
  )
}

export default Hero
