import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd"

function TaskDrag({ tasks, taskOrder, column }) {

    // const taskDragEnd = (result) => {
    //     if (!result.destination) return;

    //     const { source, destination } = result;

    //     console.log("RESULT", result)

    //     if (source.index === destination.index) return;

    //     const newOrder = [...taskOrder];
    //     const [moving] = newOrder.splice(source.index, 1);
    //     newOrder.splice(destination.index, 0, moving);

    //     setTaskOrder(newOrder)

    //     return
    // }

    // const handleClick = (e) => {

    //     e.preventDefault();
    //     window.alert("Feature Coming Soon...")
    // }

    if (!tasks.length || !taskOrder.length) return null
    return (
            <Droppable droppableId={`${column}`} type="task">
                {(provided, snapshot) => {
                    return (
                        <div className="card-info-wrapper" ref={provided.innerRef} {...provided.droppableProps} style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}>
                            {taskOrder.length && taskOrder.map((taskId, index) => {
                                const task = tasks.find((task) => task.id === taskId);
                                return (
                                    <Draggable key={task.id} draggableId={`task-${task.id}`} index={index}>
                                        {(provided) => (
                                            <div key={task.id} className="kanban-task-container" ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                <p className="task-details"><i className="fa-regular fa-circle-check"></i> {task.details}</p>
                                            </div>)}
                                    </Draggable>
                                )
                            })}
                        {provided.placeholder}
                        </div>
                    )
                }}
                
            </Droppable>
    )
}

export default TaskDrag;