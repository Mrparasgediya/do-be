export const getContactUsReplayHTML = (problem, replayText) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      rel="stylesheet"
      href="https://do-be.herokuapp.com/static/media/Gontserrat-Light-Regular.1c278f7b.woff2"
    />
    <style>
      @font-face {
        font-family: "Gontserrat";
        src: url("https://do-be.herokuapp.com/static/media/Gontserrat-Light-Regular.1c278f7b.woff2")
          format("woff2");
      }
      html {
        font-size: 10px;
        box-sizing: border-box;
      }
      *,
      *::after,
      *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
      }
      body {
        font-size: 1.4rem;
        background-color: #de2172;
        font-family: "Gontserrat", "arial";
        overflow: scroll;
      }
      h1,
      h3,
      h4 {
        font-weight: 400;
      }
      #container {
        width: 60%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-height: 60vh;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(0.5rem);
        -webkit-backdrop-filter: blur(0.5rem);
        border-radius: 1rem;
        overflow: hidden;
      }
      #header {
        position: absolute;
        top: -10rem;
        left: 50%;
        transform: translate(-50%, 5rem) rotate(-5deg);
        border: 1px solid blue;
        height: 200px;
        width: 120%;
        background: rgba(0, 0, 0, 0.8) !important;
        backdrop-filter: blur(2rem);
        -webkit-backdrop-filter: blur(1rem);
        box-shadow: 0 0.8rem 3.2rem 0 rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        border: none;
      }
      #heder__container {
        position: absolute;
        bottom: 25%;
        left: 10%;
        transform: rotate(5deg);
        display: flex;
        align-items: center;
        gap: 1.8rem;
      }
      #header img {
        height: 100px;
        width: 100px;
      }
      #brand__name h1 {
        font-size: 3.5rem;
        color: white;
        letter-spacing: 1px;
      }
      #brand__name span {
        font-size: 1.6rem;
        color: white;
      }
      #content {
        padding: 0 1.2rem 2rem;
        margin-top: 22rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }

      #content h3 {
        text-transform: capitalize;
        font-size: 2rem;
      }
      #content h4 {
        font-size: 1.6rem;
      }
      #content__replay {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
      @media screen and (max-width: 768px) {
        html {
          font-size: 8px;
        }
        #container {
          width: 90%;
        }
        #header img {
          height: 80px;
          width: 80px;
        }
        #content {
          margin-top: 25rem;
        }
      }
    </style>
  </head>
  <body>
    <div id="container">
      <div id="header">
        <div id="heder__container">
          <img
            src="https://do-be.herokuapp.com/static/media/brand.50fd4e75.png"
          />
          <div id="brand__name">
            <h1>DO & BE</h1>
            <span>dobesuppoort@gmail.com</span>
          </div>
        </div>
      </div>
      <div id="content">
        <h3>About your problem ${problem}</h3>
        <div id="content__replay">
          <h4>Reply:</h4>
          <p>${replayText}</p>
          <h4>Thank you</h4>
        </div>
      </div>
    </div>
  </body>
</html>

`;
};
