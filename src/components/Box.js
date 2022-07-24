import "./Box.css";
import {nanoid} from 'nanoid';
import closeBox from "../images/close-box.png";
import {useState} from "react";

export default function Box() {

    //console.clear();

    const hexSelector = document.querySelector('[data-js="hexSelector"]');
    const hexInput = document.querySelector('[data-js="hexInput"]');

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

    const [inputValue, setInputValue] = useState("#ffffff");

    // Synchronize color and text inputs ->
    function handleInputValue(event) {
        setInputValue(event.target.value);

    }

    // Add new color ->
    function handleSubmit(event) {
        //alert (event.target.value);
        event.preventDefault();
        setColors([...colors, {hex: inputValue, id: nanoid()}]);
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

    // Edit existing color ->
    function handleEdit(event, colorToBeEdited) {
        console.log(event.target.innerHTML);
        /*
         setColors(
             colors.map((color)=>{
             })

         )

         */
    }

    function clearOnFocus(event){
        console.log("ON FOCUS");
        event.target.value = "";
        //alert (event.target.value);
        //setInputValue("");
    }
    function insertOnBlur(event){
        console.log("ON FOCUS OUT: "+inputValue);
        event.target.value = inputValue;
        setInputValue(inputValue);

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
            {/* Color Boxes ---------------------------- >*/}
            <div className="containerStyle">
                {colors.map((color) => {
                    return (
                        <div
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
                            <div
                                className="hexTextField"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleEdit(event, color);
                                }}>
                                {color.hex}
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




