// App.js
import React, { useState, useEffect, useRef } from "react";
import imagen1 from "../public/imagen1.png";
import imagen2 from "../public/imagen2.png";
import imagen3 from "../public/imagen3.png";
import imagen4 from "../public/imagen4.png";
import imagen5 from "../public/imagen5.png";
import imagen6 from "../public/imagen6.png";
import imagen7 from "../public/imagen7.png";
import imagen8 from "../public/imagen8.png";
import imagen9 from "../public/imagen9.png";
import imagen10 from "../public/vite.svg";
import imagen11 from "../public/fondo.jpeg"

import "./App.css"; // Archivo CSS para estilos personalizados

const App = () => {
  const [p, setP] = useState(false);
  const [p1, setP1] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [enabledContainer, setEnabledContainer] = useState(0);
  const [isReset, setIsReset] = useState(true);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [droppedImages1, setDroppedImages1] = useState([]);
  const [droppedImages2, setDroppedImages2] = useState([]);
  const [droppedImages3, setDroppedImages3] = useState([]);
  const [draggedImages, setDraggedImages] = useState([]);
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("arrastrar aqui");

  useEffect(() => {
    checkMessage(droppedImages1, [imagen1, imagen2, imagen3], setMessage1);
    checkMessage(
      droppedImages2,
      [imagen4, imagen5, imagen6, imagen9],
      setMessage2
    );
    checkMessage(
      droppedImages3,
      [imagen5, imagen6, imagen7, imagen8, imagen9],
      setMessage3
    );
  }, [droppedImages1, droppedImages2, droppedImages3]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000); // Incrementar el tiempo en 1 segundo (1000 milisegundos)
    }

    return () => clearInterval(interval); // Limpiar el intervalo cuando se desmonte el componente
  }, [isRunning]);

  const checkMessage = (droppedImages, correctImages, setMessage) => {
    const sortedDroppedImages = droppedImages.map((image) => image.src).sort();
    const sortedCorrectImages = correctImages.sort();

    if (sortedDroppedImages.join(",") === sortedCorrectImages.join(",")) {
      setMessage("");
    } else {
      setMessage(" ");
    }
  };

  const handleDrop = (event, image, container) => {
    event.preventDefault();
    const newImage = { id: 11, src: image };
    if (container === 1) {
      setDroppedImages1([...droppedImages1, newImage]);
    } else if (container === 2) {
      setDroppedImages2([...droppedImages2, newImage]);
    } else if (container === 3) {
      setDroppedImages3([...droppedImages3, newImage]);
    }
    setDraggedImages([...draggedImages, newImage]);
  };

  const handleDragStart = (event, image) => {
    if (!draggedImages.includes(image)) {
      event.dataTransfer.setData("image", image.src);
      setDraggedImages([...draggedImages, image]);
    } else {
      event.preventDefault();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const cambioStrado = () => {
    setP((prevState) => !prevState);
    setP1(false);
  };

  const cambioStrado1 = () => {
    setP1((prevState) => !prevState);
    setP(true);
  };

  const handleContainerToggle = (container) => {
    setEnabledContainer(container); // Cambiar el contenedor habilitado
    setDroppedImages1([]);
    setDroppedImages2([]);
    setDroppedImages3([]);
    setDraggedImages([]);
    setMessage1("");
    setMessage2("");
    setMessage3("arrastrar aqui");
    setIsReset(false);
    setP(false);
    setIsButtonDisabled(false);
    setIsReset((previo) => !previo);
    setTime(0);
    startTimer();
  };

  useEffect(() => {
    if (enabledContainer) {
      const timer = setTimeout(() => {
        setP((prevP) => !prevP);
      
        setIsButtonDisabled(false); // Habilitar el botón nuevamente después de los 5 segundos
        stopTimer();
      }, 5000); // 5 segundos en milisegundos

      setIsButtonDisabled(true); // Deshabilitar el botón mientras ocurre el cambio automático

      return () => clearTimeout(timer);
    }
  }, [isReset, enabledContainer]);

  // Agregar la función para iniciar el cronómetro
  const startTimer = () => {
    setIsRunning(true);
  };

  // Agregar la función para detener el cronómetro
  const stopTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="contenedor-body">
      <div 
      style={{
            display: "flex",
            position:"fixed",
            top:0,
            left:95,
            marginTop:20
          }}
      >
        <h2> MEMORIA VISUAL - ARRASTRAR Y SOLTAR</h2>{" "}
      </div>

      {/* Visualización del cronómetro */}

      <div className="app-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "90px",
            marginBottom: "80",
          }}
        >
          <ImageRow>
            <DraggableImage
              image={{ id: 5, src: imagen5 }}
              handleDragStart={handleDragStart}
              isDragged={draggedImages.some((image) => image.src === imagen5)}
              disable={isButtonDisabled}
              p={p}
            />

            <DraggableImage
              image={{ id: 3, src: imagen3 }}
              handleDragStart={handleDragStart}
              isDragged={draggedImages.some((image) => image.src === imagen3)}
              disable={isButtonDisabled}
              p={p}
            />
            <DraggableImage
              image={{ id: 8, src: imagen8 }}
              handleDragStart={handleDragStart}
              isDragged={draggedImages.some((image) => image.src === imagen8)}
              disable={isButtonDisabled}
              p={p}
            />
          </ImageRow>
          <ImageRow>
            <DraggableImage
              image={{ id: 4, src: imagen4 }}
              handleDragStart={handleDragStart}
              isDragged={draggedImages.some((image) => image.src === imagen4)}
              disable={isButtonDisabled}
              p={p}
            />

            <DraggableImage
              image={{ id: 7, src: imagen7 }}
              handleDragStart={handleDragStart}
              isDragged={draggedImages.some((image) => image.src === imagen7)}
              disable={isButtonDisabled}
              p={p}
            />

            <DraggableImage
              image={{ id: 2, src: imagen2 }}
              handleDragStart={handleDragStart}
              isDragged={draggedImages.some((image) => image.src === imagen2)}
              disable={isButtonDisabled}
              p={p}
            />
          </ImageRow>
          <ImageRow>
            <DraggableImage
              image={{ id: 1, src: imagen1 }}
              handleDragStart={handleDragStart}
              isDragged={draggedImages.some((image) => image.src === imagen1)}
              disable={isButtonDisabled}
              p={p}
            />
            <DraggableImage
              image={{ id: 9, src: imagen9 }}
              handleDragStart={handleDragStart}
              isDragged={draggedImages.some((image) => image.src === imagen9)}
              disable={isButtonDisabled}
              p={p}
            />
            <DraggableImage
              image={{ id: 6, src: imagen6 }}
              handleDragStart={handleDragStart}
              isDragged={draggedImages.some((image) => image.src === imagen6)}
              disable={isButtonDisabled}
              p={p}
            />
          </ImageRow>
        </div>

        <div>
          <div className="timer-and-button">
           
            <div style={{ marginBottom: "0px" }}>
              <button onClick={cambioStrado} disabled={isButtonDisabled}>
                {"Mostrar Secuencia"}
              </button>
              <button onClick={cambioStrado1} disabled={isButtonDisabled}>
                {"Secuencias"}
              </button>
            </div>
            <div className="time" >
              <h2>    {time} </h2>
            </div>
          </div>
          {/* Agregar botones de selección para habilitar contenedores */}

          <div
            className={`${p1 ? "expanded" : "contracted"}`}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: "100px",
              gap: "10px",
            }}
          >
          {enabledContainer != 1 && (
            <button
              onClick={() => handleContainerToggle(1)}
              disabled={isButtonDisabled}
            >
              3-Imágenes
            </button>
            )}

            {enabledContainer != 2 && (
            <button
              onClick={() => handleContainerToggle(2)}
              disabled={isButtonDisabled}
            >
              4-Imágenes
            </button>
            )}

            {enabledContainer != 3 && (
            <button
              onClick={() => handleContainerToggle(3)}
              disabled={isButtonDisabled}
            >
              5-Imágenes
            </button>
            )}
          </div>

          {/* Fin  Agregar botones de selección para habilitar contenedores */}

          {enabledContainer === 0 && (
            <div>
              <DropContainer
                container={0}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                droppedImages={droppedImages1}
              />
              {message1 && <Message text={message1} />}
            </div>
          )}
          {enabledContainer === 1 && (
            <div>
              <div style={{ opacity: p ? 0 : 1,backgroundColor:"blue",display:"flex", justifyContent: "space-evenly",marginBottom:"10px"}}>
                <img src={imagen1} alt="Draggable" width="95" height="95" />
                <img src={imagen2} alt="Draggable" width="95" height="95" />
                <img src={imagen3} alt="Draggable" width="95" height="95" />
              </div>

              <DropContainer
                container={1}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                droppedImages={droppedImages1}
                allowDraggable={[imagen1, imagen2, imagen3]}
              />
              {message1 && <Message text={message1} />}
            </div>
          )}

          {enabledContainer === 2 && (
            <div>
              <div style={{ opacity: p ? 0 : 1,backgroundColor:"blue",display:"flex", justifyContent: "space-evenly",marginBottom:"10px"}}>
                <img src={imagen4} alt="Draggable" width="95" height="95"/>
                <img src={imagen5} alt="Draggable" width="95" height="95" />
                <img src={imagen6} alt="Draggable" width="95" height="95" />
                <img src={imagen9} alt="Draggable" width="95" height="95" />
              </div>

              <DropContainer
                container={2}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                droppedImages={droppedImages2}
                allowDraggable={[imagen4, imagen5, imagen6, imagen9]}
              />

              {message2 && <Message text={message2} />}
            </div>
          )}

          {enabledContainer === 3 && (
            <div >
              <div style={{ opacity: p ? 0 : 1,backgroundColor:"blue",display:"flex", justifyContent: "space-evenly",marginBottom:"10px"}}>
                <img src={imagen5} alt="Draggable" width="95" height="95" />
                <img src={imagen6} alt="Draggable" width="95" height="95" />
                <img src={imagen7} alt="Draggable" width="95" height="95" />
                <img src={imagen8} alt="Draggable" width="95" height="95" />
                <img src={imagen9} alt="Draggable" width="95" height="95" />
              </div>

              <DropContainer
                container={3}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                droppedImages={droppedImages3}
                allowDraggable={[imagen5, imagen6, imagen7, imagen8, imagen9]}
              />

              {message3 && <Message text={message3} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DropContainer = ({
  container,
  onDrop,
  onDragOver,
  droppedImages,
  allowDraggable,
}) => {
  const handleContainerDrop = (event) => {
    event.preventDefault();
    const image = event.dataTransfer.getData("image");
    if (allowDraggable && allowDraggable.includes(image)) {
      onDrop(event, image, container);
    }
  };
  return (
    <div
      onDrop={handleContainerDrop}
      onDragOver={onDragOver}
      style={{
        display: "flex",
        border: "2px dashed black",
        padding: "4px",
        maxHeight: "110",
        background: "#e6e6fa",
        height: "110",
        justifyContent: "space-evenly",
        marginBottom:"100px",
      }}
    >
      <h2></h2>
      {droppedImages.map((image, index) => (
        <img
          key={image.id}
          src={image.src}
          alt={`Dropped ${index}`}
          width="95"
          height="95"
        />
      ))}
    </div>
  );
};

const ImageRow = ({ children }) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      {children}
    </div>
  );
};

const DraggableImage = ({ image, handleDragStart, isDragged, disable, p }) => {
  const handleDrag = (event) => {
    handleDragStart(event, image);
  };

  return (
    <div
      draggable={false}
      onDragStart={(event) => handleDrag(event, image)}
      style={{
        display:"flex",
        opacity: isDragged ? 1 : 0.8,
        marginRight: "20px",
        background: "blue",
        marginBottom:"20px",
        boxShadow: '10px 4px 30px rgba(0, 123, 255, .5)', // Sombra en tono azul
      }}
    >
      <img
        src={(p || isDragged) && !disable ? image.src : imagen10}
        alt="Draggable"
        width="180"
        height="180"
      />
    </div>
  );
};

const Message = ({ text }) => {
  return (
    <div className="mensaje">
      <h2>{text}</h2>
    </div>
  );
};

export default App;