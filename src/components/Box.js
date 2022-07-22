import "./Box.css";
import { nanoid } from "nanoid";

export default function Box() {
  const colors = [
    {
      hex: "#82c91e",
      name: "schoenes gruen",
      id: nanoid(),
    },
    {
      hex: "#12b886",
      name: "gruen",
      id: nanoid(),
    },
  ];
  function handleSubmit() {
    alert("submit");
  }

  return (
    <div className="containerMain">
      <div className="containerStyle">
        <div>
          <form
            className="boxInput"
            aria-labelledby="user"
            onSubmit={handleSubmit}
          >
            <h2 id="user">New color</h2>

            <input id="name" type="color" />
            <input
              id="name"
              type="text"
              className="input"
              placeholder="Hex Value"
            />
            <button>Add</button>
          </form>
        </div>
      </div>
      <div className="containerStyle">
        {colors.map((color) => {
          return (
            <div
              className="boxColor"
              style={{ backgroundColor: color.hex }}
              onClick={() => {
                navigator.clipboard.writeText(color.hex).then(() => {
                  alert("copied: " + color.hex);
                });
              }}
            >
              <div className="textField">{color.hex}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
