import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const itemsBackend = [
  {
    id: uuid(),
    content: "Recolectar y enlistar los requerimientos de la página.",
  },
  { id: uuid(), content: "Definir el estilo de la página" },
  {
    id: uuid(),
    content: "Crear un mapa simple mostrando las principales páginas a crear.",
  },
  {
    id: uuid(),
    content: "Investigar o elegir colores representativos de la empresa.",
  },
  { id: uuid(), content: "Recolectar material visual ya creado." },
  {
    id: uuid(),
    content: "Crear cualquier material audiovisual con el que no se cuente.",
  },
  {
    id: uuid(),
    content:
      "Crear layout tan detallado como sea posible basado en el estilo de la página creado en Prototipo de la página.",
  },
  { id: uuid(), content: "Basado en el prototipo, crear páginas principales." },
  {
    id: uuid(),
    content:
      "Hacer un listado de páginas que no fueron consideradas originalmente.",
  },
  { id: uuid(), content: "Hacer layout de páginas no consideradas." },
  {
    id: uuid(),
    content:
      "Terminar la página en HTML con todos los links necesarios basado en el layout y el prototipo.",
  },
  {
    id: uuid(),
    content: "Crear iconos originales usando colores de la empresa.",
  },
  {
    id: uuid(),
    content:
      "Empezar por las páginas principales, tomando a consideración que se hará primero el diseño para web para después pasar a aplicaciones moviles.",
  },
  {
    id: uuid(),
    content: "Implementar el material audivisual previamente recolectado.",
  },
  {
    id: uuid(),
    content: "Crear cualquier página adicional que haya sido considerada.",
  },
  {
    id: uuid(),
    content: "Crear layout para moviles basado en el que ya tenemos",
  },
  { id: uuid(), content: "Aplicar diseño responsivo" },
];

const columnaBackend = {
  [uuid()]: {
    name: "Backlog",
    items: itemsBackend,
  },
  [uuid()]: {
    name: "Pendiente",
    items: [],
  },
  [uuid()]: {
    name: "En progreso",
    items: [],
  },
  [uuid()]: {
    name: "Finalizado",
    items: [],
  },
};

const onDragEnd = (resultado, columna, estColumna) => {
  if (!resultado.destination) return;
  const { source, destination } = resultado;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columna[source.droppableId];
    const destColumna = columna[destination.droppableId];
    const itemFuente = [...sourceColumn.items];
    const destItems = [...destColumna.items];
    const [removed] = itemFuente.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    estColumna({
      ...columna,
      [source.droppableId]: {
        ...sourceColumn,
        items: itemFuente,
      },
      [destination.droppableId]: {
        ...destColumna,
        items: destItems,
      },
    });
  } else {
    const column = columna[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    estColumna({
      ...columna,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function App() {
  const [columna, estColumna] = useState(columnaBackend);
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(resultado) => onDragEnd(resultado, columna, estColumna)}
      >
        {Object.entries(columna).map(([columnaId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnaId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnaId} key={columnaId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightpink"
                            : "lightblue",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
