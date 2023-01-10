import React from "react";
import { Outlet } from "react-router-dom";
import style from './homePage.module.css'

export default function HomePage() {
    return (
        <section className={style.homePageSection}>
            <div className={style.homePageDiv}>
                <img
                    src="https://wwr-pro.s3-us-west-2.amazonaws.com/blog/2020/10/virtual-onboarding_3.png"
                    className={`img-fluid ${style.homePageImg}`}
                    alt="twoEmployee"
                    style={{ maxWidth: "50%" }}
                />
                <div>
                    <h1 className="display-6 ps-1 mb-4">Employee Review System</h1>
                    <small className="ps-4"> <i><i class="fa-solid fa-music"></i> &nbsp; If I Sang the praises of your Hard work, </i></small>
                    <small className="ps-5 mb-4"> <i><i class="fa-solid fa-microphone-slash"></i> &nbsp; I would lose my voice pretty quickly!!</i></small>
                    <Outlet />
                </div>
            </div>
        </section>
    )
}