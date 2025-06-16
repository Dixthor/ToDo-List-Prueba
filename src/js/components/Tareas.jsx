import React, { useEffect } from "react";
import { useState } from "react";


const Lista = () => {
    const [tareas, setTareas] = useState([]);
    const [entrada, setEntrada] = useState('');

    const crearUsuario = () => {
        fetch('https://playground.4geeks.com/todo/users/CarlosVillalobos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => console.log(data.todos));
        // .catch((error)=>console.log(error))
    }

    const traerUsuario = () => {
        fetch('https://playground.4geeks.com/todo/users/CarlosVillalobos', {
            method: "GET",
        })
            .then(response => {
                if (response.status === 404) {
                    crearUsuario()
                }

                return response.json()
            })
            .then(data => setTareas(data.todos));
    }


    useEffect(() => {

        traerUsuario()

    }, [])



    const entradaTarea = (evento) => {
        setEntrada(evento.target.value);
    }


    const agregarTarea = () => {
        fetch('https://playground.4geeks.com/todo/todos/CarlosVillalobos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                label: entrada,
                is_done: false
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo agregar la tarea");

                }
                return response.json()
            })
            .then(data => {
                if (data) {
                    setTareas([...tareas, data]);
                    setEntrada('');
                }

            })
            .catch(error => console.log(error))

    }

    const eliminarTarea = (tareaId) => {

        fetch(`https://playground.4geeks.com/todo/todos/${tareaId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },

        })

            .then(res => {
                if (!res.ok) {
                    throw new Error("No se pudo eliminar la tarea");

                }
                const result = tareas.filter(item => item.id != tareaId)
                setTareas(result)
            })
            .catch(error => console.log(error))


    }

    const placeHolderDeTarea = () => {
        return tareas.length === 0 ? "No hay tareas, añadir tareas" : "¿Quieres añadir más tares?";
    }




    return (
        <div className="lista text-center container row d-flex justify-content-center">
            <input className="insertar-tareas col-12" type="text" onChange={entradaTarea} onKeyDown={(e) => {
              

                if (e.key == 'Enter') {
                    agregarTarea()

                }
            }} value={entrada} placeholder={placeHolderDeTarea()} />
            <div className="container">
                <ol className="text-center container row justify-content-center">
                    {tareas.map((tarea) => (
                        <div key={tarea.id} className="tarea-item-wrapper d-flex align-items-center my-2">
                            <li className="col-11 tareas">{tarea.label}</li>
                            <button
                                type="button"
                                className="col-1 boton "
                                onClick={() => eliminarTarea(tarea.id)}
                            >
                                X
                            </button>
                        </div>
                    ))}

                </ol>
            </div>

            <div>
                <p>Tareas restantes: {tareas.length}</p>
            </div>

        </div>
    );
};

export default Lista;