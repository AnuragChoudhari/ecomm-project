import React from "react";
import "./ErrPage.css"

const ErrPage = () => {
  return (
    <div className="container" id="err-page-container">
      <section class="page_404" id="err-page-sec">
        <div class="container" id="container-sec">
          <div class="row" style={{width: "100vw"}}>
            <div class="col-sm-12 " style={{display: "flex", justifyContent: "center"}}>
              <div class="col-sm-10 col-sm-offset-1  text-center" id="something">
                <div class="four_zero_four_bg">
                  <h1 class="text-center ">404</h1>
                </div>

                <div class="contant_box_404">
                  <h3 class="h2">Look like you're lost</h3>

                  <p>the page you are looking for not avaible!</p>

                  <a href="" class="link_404">
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrPage;
