// App.js
import React, { useState, useEffect } from 'react';
import imagen1 from "../public/imagen1.png"
import imagen2 from "../public/imagen2.png"
import imagen3 from "../public/imagen3.png"
import imagen4 from "../public/imagen4.png"
import imagen5 from "../public/imagen5.png"
import imagen6 from "../public/imagen6.png"
import imagen7 from "../public/imagen7.png"
import imagen8 from "../public/imagen8.png"
import imagen9 from "../public/imagen9.png"
import imagen10 from "../public/vite.svg"

import './App.css'; // Archivo CSS para estilos personalizados

const App = () => {
  const [droppedImages1, setDroppedImages1] = useState([]);
  const [droppedImages2, setDroppedImages2] = useState([]);
  const [droppedImages3, setDroppedImages3] = useState([]);
  const [draggedImages, setDraggedImages] = useState([]);
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const [message3, setMessage3] = useState('');

  useEffect(() => {
    checkMessage(droppedImages1, [imagen1, imagen2, imagen3], setMessage1);
    checkMessage(droppedImages2, [imagen4, imagen5, imagen6], setMessage2);
    checkMessage(droppedImages3, [imagen7, imagen8, imagen9], setMessage3);
  }, [droppedImages1, droppedImages2, droppedImages3]);

  const checkMessage = (droppedImages, correctImages, setMessage) => {
    const sortedDroppedImages = droppedImages.map((image) => image.src).sort();
    const sortedCorrectImages = correctImages.sort();

    if (sortedDroppedImages.join(',') === sortedCorrectImages.join(',')) {
      setMessage('BIEN HECHO');
    } else {
      setMessage(' ');
    }
  };

  const handleDrop = (event, image, container) => {
    event.preventDefault();
    const newImage = { id: 10, src: image };
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
      event.dataTransfer.setData('image', image.src);
      setDraggedImages([...draggedImages, image]);
    } else {
      event.preventDefault();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
   
    <div className="app-container">
   
      <div style={{ marginRight: '200px' }}>

        <h2> ARRASTRAR Y SOLTAR</h2>
        <ImageRow>
          <DraggableImage
            image={{ id: 5, src: imagen5 }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === imagen5)}
          />
         
          <DraggableImage
            image={{ id: 3, src: imagen3 }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === imagen3)}
          />
          <DraggableImage
            image={{ id: 8, src: imagen8 }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === imagen8)}
          />
        </ImageRow>
        <ImageRow>
          <DraggableImage
            image={{ id: 4, src: imagen4 }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === imagen4)}
          />
          
          <DraggableImage
            image={{ id: 7, src: imagen7 }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === imagen7)}
          />

            <DraggableImage
            image={{ id: 2, src: imagen2 }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === imagen2)}
          />
        </ImageRow>
        <ImageRow>
          <DraggableImage
            image={{ id: 1, src: imagen1}}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === imagen1)}
          />
          <DraggableImage
            image={{ id: 9, src: imagen9 }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === imagen9)}
          />
          <DraggableImage
            image={{ id: 6, src: imagen6 }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === imagen6)}
          />
        </ImageRow>
      </div>
      <div>
      <h2> Arrastrar: Barrer, Tomar y Ahorrar</h2>
        <DropContainer
          container={1}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          droppedImages={droppedImages1}
          allowDraggable={[imagen1, imagen2, imagen3]}
        />
        {message1 && <Message text={message1} />}
        <h2> Arrastrar: Helado, Batido y Té </h2>
        <DropContainer
        
          container={2}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          droppedImages={droppedImages2}
          allowDraggable={[imagen4, imagen5, imagen6]}
          
        />
        
        {message2 && <Message text={message2} />}
        
      </div>
    </div>
  );
};

const DropContainer = ({ container, onDrop, onDragOver, droppedImages, allowDraggable }) => {
  const handleContainerDrop = (event) => {
    event.preventDefault();
    const image = event.dataTransfer.getData('image');
    if (allowDraggable && allowDraggable.includes(image)) {
      onDrop(event, image, container);
    }
  };

  return (
    <div
      onDrop={handleContainerDrop}
      onDragOver={onDragOver}
      style={{
        border: '2px dashed black',
        padding: '20px',
        marginTop: '20px',
        background:"#e6e6fa"
      }}
    >
      <h2></h2>
      {droppedImages.map((image, index) => (
        <img
          key={image.id}
          src={image.src}
          alt={`Dropped ${index}`}
          width="150"
          height="150"
          
        />
      ))}
    </div>
  );
};

const ImageRow = ({ children }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
      {children}
    </div>
  );
};

const DraggableImage = ({ image, handleDragStart, isDragged }) => {
  const handleDrag = (event) => {
    handleDragStart(event, image);
  };

  return (
    <div
      draggable
      onDragStart={(event) => handleDrag(event, image)}
      style={{ opacity: isDragged ? 0.7 : 1, marginRight: '20px', background:"black"}}
    >
      <img src={isDragged ? imagen10:image.src} alt="Draggable" width="200" height="200" />
    </div>
  );
};

const Message = ({ text }) => {
  return (
    <div className='mensaje'>
      <h2>{text}</h2>
    </div>
  );
};

export default App;
