import axios from "axios";
import { useState } from "react";
import "./App.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
var dateFormat = require("dateformat");
var now = new Date();
require("dotenv").config();

const api_key = process.env.REACT_APP_API_KEY;
const api_base = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  // const [classname, setclassname] = useState("");

  //Modal components
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const search = (evt) => {
    // console.log("Pressed Key");
    if (evt.key === "Enter") {
      axios
        .get(`${api_base}weather?q=${query}&units=metric&APPID=${api_key}`)
        .then((res) => {
          // console.log("response direct ", res);
          const { data } = res;
          if (data === "undefined") console.log("Bullshit");
          // if()
          setWeather(data);
          setQuery("");
          console.log(data);
        })
        .catch((e) => {
          console.log("API call failed ", e);
          toggle();
        });
    }
  };

  var date = dateFormat(now, "dddd, mmmm dS, yyyy");
  // var clsname = "app";
  const background = (cond) => {
    switch (cond) {
      case "Rain":
        return "app rain";

      case "Clear":
        return "app clear";

      case "Haze":
        return "app haze";

      case "Mist":
        return "app mist";

      case "Clouds":
        return "app clouds";

      default:
        return "app";
    }
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? background(weather.weather[0].main)
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />

          {typeof weather.main != "undefined" ? (
            <div>
              {console.log("check ", weather.weather[0].main)}
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{date}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </main>

      <Modal
        isOpen={modal}
        toggle={toggle}
        className="modal-eka text-white display-3"
      >
        City not found!
      </Modal>
    </div>
  );
}

export default App;

// {console.log(process.env.NODE_ENV)}
//           {console.log(process.env.NODE_ENV === "dev")}
//           {console.log(process.env.NODE_ENV.length)}
// {console.log(process.env.REACT_APP_API_BASE_URL)}

// <div
//       className={
//         typeof weather.main != "undefined"
//           ? weather.main.temp > 16
//             ? weather.weather[0].main == "Rain"
//               ? "app rain"
//               : "app warm"
//             : "app"
//           : "app"
//       }
//     ></div>

// <div
// className={
//   typeof weather.main != "undefined" ? (
//     typeof weather.weather[0].main == "Rain" ? "app rain"
//     || typeof weather.weather[0].main == "Haze" ? "app haze"
//     || typeof weather.weather[0].main == "Mist" ? "app mist"
//     || typeof weather.weather[0].main == "Clouds" ? "app clouds"
//     || typeof weather.weather[0].main == "Clear" ? "app clear"
//     : "app"
//   ) :"app"
//   // : "app"
// }
// >

//Original
// <div
//       className={
//         typeof weather.main != "undefined"
//           ? weather.main.temp > 16
//             ? "app warm"
//             : "app"
//           : "app"
//       }
//     ></div>

// Modal Button
// <Button color="danger" onClick={toggle}>
//           Error
//         </Button>

// // Modal Footer
// <ModalFooter className="foota">
//             <Button color="info" onClick={toggle}>
//               Close
//             </Button>
//           </ModalFooter>
// <ModalBody className="baady">City not found!</ModalBody>

// <ModalHeader
//           toggle={toggle}
//           className="sar text-white display-3 border-0"
//         >
//           City not found!
//         </ModalHeader>

// <ModalBody className="baady text-white display-3">
//           City not found!
//         </ModalBody>
