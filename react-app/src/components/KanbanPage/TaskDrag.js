import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd"

function TaskDrag({ tasks, taskOrder, column }) {
    const handleClick = (e) => {

        e.preventDefault();
        window.alert("Feature Coming Soon...")
    }

    if (!tasks || !taskOrder || !taskOrder.length) {
        return (
            <Droppable droppableId={`${column}`} type="task">
                {(provided, snapshot) => {
                    return (
                        <div className="card-info-wrapper" ref={provided.innerRef} {...provided.droppableProps} style={{ backgroundColor: snapshot.isDraggingOver ? '#f5c1c8' : 'var(--white-background)', paddingTop: "0"}}>
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>

        )
    }
    return (
        <Droppable droppableId={`${column}`} type="task">
            {(provided, snapshot) => {
                return (
                    <div className="card-info-wrapper" ref={provided.innerRef} {...provided.droppableProps} style={{ backgroundColor: snapshot.isDraggingOver ? '#f5c1c8' : 'var(--white-background)' }}>
                        {taskOrder.length && taskOrder.map((taskId, index) => {
                            const task = tasks[taskId];
                            if (!task) return null;
                            return (
                                <Draggable key={task.id} draggableId={`task-${task.id}`} index={index}>
                                    {(provided) => (
                                        <div key={task.id} className="kanban-task-container" ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onClick={handleClick}>
                                            <p className="task-details"><i className="fa-regular fa-circle-check"></i> {task.details}</p>
                                        </div>
                                    )}
                                </Draggable>
                            )
                        })}
                        
                        {provided.placeholder}
                    </div>
                )
            }}

        </Droppable>
    )}

export default TaskDrag;