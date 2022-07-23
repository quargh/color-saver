import "./Box.css";
import {nanoid} from 'nanoid';
import closeBox from "../images/close-box.png";
import {useState} from "react";

export default function Box() {


    const [colors, setColors] = useState([
        {
            hex: "#82c91e",
            name: "beautiful green",
            id: nanoid(),
        },
        {
            hex: "#12b886",
            name: "green",
            id: nanoid(),
        },
        {
            hex: "#18c316",
            name: "seagreen",
            id: nanoid(),
        }
    ]);

    const [inputValue, setInputValue] = useState("#dd0e72");

    function handleInputValue(event) {
        //alert("changed InputValue");
        setInputValue(event.target.value);
    }

    function handleSubmit() {
        alert("submit");
    }

    function handleClose(colorToBeDeleted) {
        //alert("close: " + color.name);

        setColors(
            colors.filter((color) => {
                return color.id !== colorToBeDeleted.id;
            })
        );


    }

    //Das ist ein Comment
    return (
        //Main Container
        <div className="containerMain">
            {/*Input Form Box*/}
            <div className="containerStyle">
                <div>
                    <form
                        className="inputBox"
                        aria-labelledby="user"
                        onSubmit={handleSubmit}
                    >
                        <h2 id="user">New color</h2>
                        <input
                            id="name"
                            type="color"
                            value={inputValue}
                            onChange={handleInputValue}/>
                        <input
                            id="name"
                            type="text"
                            className="hexInputField"
                            placeholder="Hex Value"
                            value={inputValue}
                            onChange={handleInputValue}
                        />
                        <button>Add</button>
                    </form>
                </div>
            </div>
            {/*Color Boxes*/}
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
                            <div className="hexTextField">{color.hex}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


