import "./Box.css";
import {nanoid} from 'nanoid';
import closeBox from "../images/close-box.png";
import editBox from "../images/pencil-box-outline.png";
import {useState} from "react";

export default function Box() {

      //console.clear();

      const [colors, setColors] = useState([
            {
                  id: nanoid(),
                  hex: "#82c91e",
            },
            {
                  id: nanoid(),
                  hex: "#12b886",
            },
            {
                  id: nanoid(),
                  hex: "#18c316",
            }
      ]);

      const [inputValue, setInputValue] = useState("#000000");

      // Synchronize color and text inputs ->
      function handleInputValue(event) {
            event.target.value = checkHashtag(event.target.value);
            setInputValue(event.target.value);
      }

      //Check Hashtag
      function checkHashtag(hex) {
            if (hex.charAt(0) !== "#") {
                  return ("#" + hex);
            }
            return hex;
      }

      // Add new color ->
      function handleSubmit(event) {
            //alert (event.target.value);
            event.preventDefault();
            setColors([{hex: inputValue, id: nanoid()}, ...colors]);
            //hexSelector.style.backgroundColor = '#000000'
            //setInputValue("");
      }

      // Delete a color ->
      function handleClose(colorToBeDeleted) {
            setColors(
                colors.filter((color) => {
                      return color.id !== colorToBeDeleted.id;
                })
            );
      }

      function clearOnFocus(event) {
            console.log("ON FOCUS");
            event.target.value = "";
            //alert (event.target.value);
            //setInputValue("");
      }

      function insertOnBlur(event) {
            console.log("ON FOCUS OUT: " + inputValue);
            event.target.value = inputValue;
            setInputValue(inputValue);
      }

      function toggleInputVisibility(id) {
            // -- get input field
            const element = document.getElementById(id);
            const invisibleInputField = element.querySelector('[data-js="invisibleInputField"]');

            console.log(invisibleInputField.style.display)
            if (invisibleInputField.style.display === "block") {
                  invisibleInputField.style.display = "none";
            } else {
                  invisibleInputField.style.display = "block";
                  invisibleInputField.value = "";
                  invisibleInputField.focus();
            }
      }

      function unFocus(id) {
            const element = document.getElementById(id);
            const invisibleInputField = element.querySelector('[data-js="invisibleInputField"]');
            invisibleInputField.blur();
            invisibleInputField.style.display = "none";
      }


      return (
          //Main Container ------------------------------------------------------- >
          <div className="containerMain">
                {/* Input Form Box ---------------------- > */}
                <div className="containerStyle">
                      <div>
                            <form
                                className="inputBox"
                                aria-labelledby="user"
                                onSubmit={(event) => {
                                      handleSubmit(event);

                                }}
                            >
                                  <h2 id="headline" className={"inputFormHeadline"}>New color</h2>
                                  <div className={"hexSelectorContainer"}>
                                        <input
                                            data-js="hexSelector"
                                            className="hexSelector"
                                            id="colorInput"
                                            type="color"
                                            value={inputValue}
                                            onChange={handleInputValue}/>
                                  </div>
                                  <input
                                      onFocus={(event) => {
                                            clearOnFocus(event);
                                      }}
                                      onBlur={(event) => {
                                            insertOnBlur(event);
                                      }}

                                      id="textInput"
                                      type="text"
                                      data-js="hexInput"
                                      className="hexInputField"
                                      placeholder="enter hex value"
                                      value={inputValue}
                                      onChange={handleInputValue}
                                  />
                                  <button className={"submitButton"}>ADD COLOR</button>
                            </form>
                      </div>
                </div>
                {/* End of Input Form Box ----------------- > */}
                {/* ---------------------------------------- >*/}
                {/* ---------------------------------------- >*/}
                {/* ---------------------------------------- >*/}
                {/* ---------------------------------------- >*/}
                {/* ---------------------------------------- >*/}
                {/* Color Boxes ---------------------------- >*/}
                <div className="containerStyle">
                      {colors.map((color) => {
                            return (
                                <div
                                    key={color.id}
                                    id={color.id}
                                    className="colorBox"
                                    style={{backgroundColor: color.hex}}
                                    onClick={() => {
                                          navigator.clipboard.writeText(color.hex).then(() => {
                                                alert("copied: " + color.hex);
                                          });
                                    }}
                                >
                                      <img
                                          src={closeBox}
                                          alt={"close"}
                                          width={30}
                                          height={30}
                                          className={"closeBox"}
                                          onClick={(event) => {
                                                event.stopPropagation();
                                                handleClose(color);
                                          }}
                                      />
                                      <img
                                          src={editBox}
                                          alt={"edit"}
                                          width={30}
                                          height={30}
                                          className={"editBox"}
                                          onClick={(event) => {
                                                event.stopPropagation();
                                                toggleInputVisibility(color.id);
                                          }}
                                      />

                                      <div
                                          className="hexTextField"
                                          onClick={(event) => {
                                                event.stopPropagation();
                                                toggleInputVisibility(color.id);
                                          }}>
                                            {color.hex}
                                            {/* Invisible Input Field ----------> */}
                                            <input
                                                onChange={(event) => {
                                                      event.target.value = checkHashtag(event.target.value)
                                                }}
                                                onBlur={(event) => {
                                                      toggleInputVisibility(color.id);
                                                }}
                                                onKeyDown={(event) => {
                                                      if (event.key === "Enter") {
                                                            unFocus(color.id);
                                                            console.log("Enter pressed: " + event.target.value);
                                                            //TODO Update Color Array with new Hex
                                                            setColors(
                                                                colors.map((arrayColor) => {
                                                                      return arrayColor.id === color.id ? {
                                                                            ...arrayColor,
                                                                            hex: event.target.value
                                                                      } : arrayColor;
                                                                })
                                                            )
                                                      }
                                                }}
                                                type="text"
                                                data-js={"invisibleInputField"}
                                                className="invisibleInput"

                                            />
                                      </div>
                                </div>
                            );
                      })}
                </div>
                {/* End of Color Boxes ---------------------- >*/}
          </div>
          // End of Main Container --------------------------------------------------- //
      );
}




