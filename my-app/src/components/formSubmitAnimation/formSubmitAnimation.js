import React from "react"
import style from "./formSubmitAnimation.module.css"

export default function FormSubmitAnimation() {
    return (
        <React.Fragment>
            <section className={style.section}>
                <div className={style.divLeft}><div className={style.divDot}></div></div>
                <div className={style.divMiddle}><div className={style.divDot}></div></div>
                <div className={style.divRight}><div className={style.divDot}></div></div>
            </section>
            <p className={` display-6 ${style.h1}`}></p>
        </React.Fragment>
    )
}