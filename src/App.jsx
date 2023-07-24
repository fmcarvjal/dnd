// App.js
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
    checkMessage(droppedImages1, ['/imagen1.png', '/imagen2.png', '/imagen3.png'], setMessage1);
    checkMessage(droppedImages2, ['/imagen4.png', '/imagen5.png', '/imagen6.png'], setMessage2);
    checkMessage(droppedImages3, ['/imagen7.png', '/imagen8.png', '/imagen9.png'], setMessage3);
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
    const newImage = { id: uuidv4(), src: image };
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
            image={{ id: 5, src: '/imagen5.png' }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === '/imagen5.png')}
          />
         
          <DraggableImage
            image={{ id: 3, src: '/imagen3.png' }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === '/imagen3.png')}
          />
          <DraggableImage
            image={{ id: 8, src: '/imagen8.png' }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === '/imagen8.png')}
          />
        </ImageRow>
        <ImageRow>
          <DraggableImage
            image={{ id: 4, src: '/imagen4.png' }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === '/imagen4.png')}
          />
          
          <DraggableImage
            image={{ id: 7, src: '/imagen7.png' }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === '/imagen7.png')}
          />

            <DraggableImage
            image={{ id: 2, src: '/imagen2.png' }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === '/imagen2.png')}
          />
        </ImageRow>
        <ImageRow>
          <DraggableImage
            image={{ id: uuidv4(), src: '/imagen1.png'}}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === '/imagen1.png')}
          />
          <DraggableImage
            image={{ id: 9, src: '/imagen9.png' }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === '/imagen9.png')}
          />
          <DraggableImage
            image={{ id: 6, src: '/imagen6.png' }}
            handleDragStart={handleDragStart}
            isDragged={draggedImages.some((image) => image.src === '/imagen6.png')}
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
          allowDraggable={['/imagen1.png', '/imagen2.png', '/imagen3.png']}
        />
        {message1 && <Message text={message1} />}
        <h2> Arrastrar: Helado, Batido y Té </h2>
        <DropContainer
        
          container={2}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          droppedImages={droppedImages2}
          allowDraggable={['/imagen4.png', '/imagen5.png', '/imagen6.png']}
          
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
      <img src={isDragged ? "/vite.svg":image.src} alt="Draggable" width="200" height="200" />
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
