//Crear y llamar al objeto fabric.canvas

const initCanvas= (id) => {
  return new fabric.Canvas(id, {
    selection: false
  });
}

document.getElementById('settingsDraw').style.display = 'none';
document.getElementById('settingsFigure').style.display = 'none';
document.getElementById('warning_1').style.display = 'none';

const canvas = initCanvas('canvas');
let mousePressed = false;


//Elegir imagen background
input.onchange = (evnt) => {
  const file = evnt.target.files[0];
  const url = URL.createObjectURL(file);

  fabric.Image.fromURL(url, (img) => {
    canvas.backgroundImage = img
    const maxWidth = 800;
    const maxHeight = 600;
    let width = img.width;
    let height = img.height;
    let ratio = null;
    if (width > maxWidth || height > maxHeight){
      ratio = Math.min(maxWidth / width, maxHeight / height);
      width *= ratio;
      height *= ratio;
      console.log(ratio);
    }
    if (ratio != null){
      img.scale(ratio);
    }
    canvas.setWidth(width);
    canvas.setHeight(height);
  
    canvas.requestRenderAll()
  }
)};

canvas.setBackgroundColor('#f0f0f0', canvas.renderAll.bind(canvas));

//Agregar imagenes/elementos
input2.onchange = (evnt) => {
  const file = evnt.target.files[0];
  const url = URL.createObjectURL(file);
  console.log(url)
  const imgNode = new Image();
  imgNode.src = url;
  imgNode.onload = () => {
    const img = new fabric.Image(imgNode, {
      /*
      left: 100,
      top: 100,
      angle: 0,
      opacity: 1,*/
    });
    canvas.add(img);
  };
};

//cuadrado rojo

bShowSquare.onclick = () => {
  if(document.getElementById('settingsFigure').style.display == 'none') {
    document.getElementById('settingsFigure').style.display = 'block';
  } else {
    document.getElementById('settingsFigure').style.display = 'none';
  }
}

const opFigure = document.querySelector('#opFigure');
console.log(opFigure.value);
opFigure.addEventListener('change', () => {
  let valorOption = opFigure.value;
  console.log(valorOption);
  if(valorOption == ""){
    addFig.onclick = () => {
      document.getElementById('warning_1').style.display = 'block';
    }
  }
  if(valorOption == 1){
    addFig.onclick = () => {
      var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: var_col,
        width: 50,
        height: 50,
      });

      canvas.add(rect);
    }

  } else if(valorOption == 2) {
    addFig.onclick = () => {
      var circulo = new fabric.Circle({
        radius: 50, // Radio del círculo
        fill: var_col, // Color de relleno del círculo
        left: 100, // Posición horizontal del círculo
        top: 100 // Posición vertical del círculo
      });

      canvas.add(circulo);
    }

  } else if(valorOption == 3) {
    canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
    //canvas.freeDrawingBrush.color = 'red';
    canvas.freeDrawingBrush.width = 15;
  } else if(valorOption == 4) {
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
  }

  var optionSelect = opFigure.option[opFigure.selectedIndex];
})

const opColor = document.querySelector('#opColor');
console.log(opColor);
opColor.addEventListener('change', () => {
  let valorOption = opColor.value;
  console.log(valorOption);
  if(valorOption == 1){
    return var_col = "red";
  } else if(valorOption == 2) {
    return var_col = "purple"
  } else if(valorOption == 3) {
    return var_col = "black";
  } else if(valorOption == 4) {
    return var_col = "pink";
  } else if(valorOption == 5) {
    return var_col = "white";
  } else if(valorOption == 6) {
    return var_col = "yellow";
  } else if(valorOption == 7) {
    return var_col = "blue";
  } else if(valorOption == 8) {
    return var_col = "green";
  }

  var optionSelect = opColor.option[opColor.selectedIndex];
})

//Eliminar imagen/elemento seleccionado
del.onclick = () => {
  const GS = canvas.getActiveObject();
  canvas.remove(GS);
  canvas.requestRenderAll()
};

//Boton para descargar imagen
btn.onclick = () => {
  const dataURL = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.download = "true";
  a.href = dataURL
  a.click();
};

//rastreo del mouse con/sin presionar
canvas.on('mouse:down', (event) => {
  mousePressed = true;
})
canvas.on('mouse:up', (event) => {
  mousePressed = false;
})

/*IDEA: hacer una variable y funcion que funcione para cambiar de modo y simplicar codigo y mejorar escalabilidad (evaluar...)
const modes = {
  pan: 'pan',
  drawing: 'drawing'
}
const toggleMode = (mode) => {
  
  if(mode === mode.pan) {
    if(currentMode === modes.pan) {
      currentMode = ""
    } else {
      currentMode = modes.pan
    }
  } else if(mode === modes.drawing) {
    if(currentMode === modes.drawing) {
      currentMode = ""
    } else {
      currentMode = modes.drawing
    }
  }
  console.log(mode)
}
*/

//cancel button general
cancelButton.onclick = () => {
  scrollScreen = false;
  canvas.selection = false;
  canvas.isDrawingMode = false;
}

//DRAWING Fun:

//function mostrar() {} *???*

bDraw.onclick = () => {
  canvas.isDrawingMode = true;

  scrollScreen = false;
  canvas.selection = false;
  canvas.renderAll()

  //recordatorio: si es true cambiar color de botones en css
}

bShowDraw.onclick = () => {
  if(document.getElementById('settingsDraw').style.display == 'none') {
    document.getElementById('settingsDraw').style.display = 'block';
  } else {
      document.getElementById('settingsDraw').style.display = 'none';
  }
}


//tipo de draw
const opTTrazo = document.querySelector('#opTrazo');
console.log(opTTrazo);
opTTrazo.addEventListener('change', () => {
  let valorOption = opTTrazo.value;
  console.log(valorOption);
  //AYUDDAAAA
  if(valorOption == ""){
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
  } else if(valorOption == 1) {
    canvas.freeDrawingBrush = new fabric.CircleBrush(canvas)
    canvas.freeDrawingBrush.color = ColDraw;
  } else if(valorOption == 2) {
    canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
    canvas.freeDrawingBrush.color = ColDraw;
    //canvas.freeDrawingBrush.width = 15;
  } else if(valorOption == 3) {
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
    canvas.freeDrawingBrush.color = ColDraw;
  }

  var optionSelect = opTTrazo.option[opTTrazo.selectedIndex];
})

//color picker para el draw
const opColorDraw = document.querySelector('#opColorDraw');
console.log(opColorDraw);
opColorDraw.addEventListener('change', () => {
  let valorOption = opColorDraw.value;
  console.log(valorOption);
  if(valorOption == 1){
    canvas.freeDrawingBrush.color = 'red';
    return ColDraw = 'red';
  } else if(valorOption == 2) {
    canvas.freeDrawingBrush.color = 'purple';
    return ColDraw = 'purple';
  } else if(valorOption == 3) {
    canvas.freeDrawingBrush.color = 'green';
    return ColDraw = 'green';
  } else if(valorOption == 4) {
    canvas.freeDrawingBrush.color = 'pink';
    return ColDraw = 'pink';
  } else if(valorOption == 5) {
    canvas.freeDrawingBrush.color = 'white';
    return ColDraw = 'white';
  } else if(valorOption == 6) {
    canvas.freeDrawingBrush.color = 'yellow';
    return ColDraw = 'yellow';
  } else if(valorOption == 7) {
    canvas.freeDrawingBrush.color = 'blue';
    return ColDraw = 'blue';
  }

  var optionSelect = opColorDraw.option[opColorDraw.selectedIndex];
})

//SELECCION Fun:

//Botones para activar/desactivar selección
sButton.onclick = () => {
  canvas.selection = true;
  scrollScreen = false;
  canvas.isDrawingMode = false;
  //recordatorio: si es true cambiar color en css
};

//Override setCursor
fabric.Canvas.prototype.setCursor = function (value) {
  if (canvas.selection == true) value = 'crosshair'; // Add your own logic here to override
  this.upperCanvasEl.style.cursor = value;
};


//SCROLL Fun:

bScroll.onclick = () => {
  scrollScreen = true;  //recordatorio: si es true cambiar color en css
  canvas.selection=false;
  canvas.isDrawingMode = false;
}

//Override setCursor
fabric.Canvas.prototype.setCursor = function (value) {
  if (scrollScreen == true) value = 'grab'; // Add your own logic here to override
  this.upperCanvasEl.style.cursor = value;
};

//mouse:over - scroll
canvas.on('mouse:move', (event) => {
  if (mousePressed && scrollScreen) {
    const mEvent = event.e;
    const delta = new fabric.Point(mEvent.movementX, mEvent.movementY)
    canvas.relativePan(delta)
  }
})

