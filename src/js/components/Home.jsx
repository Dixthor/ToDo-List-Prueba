import React, { useEffect, useState } from "react";


import Tarea from "./Tareas";

const Home = () => {
	const [tareas, setTareas] = useState([]);


	const crearUsuario = () => {
		fetch('https://playground.4geeks.com/todo/users/CarlosVillalobos', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(data => console.log(data.todos));
		
	}

	const traerUsuario = () => {
		fetch('https://playground.4geeks.com/todo/users/CarlosVillalobos', {
			method: "GET",
		})
			.then(response => {
				if (response.status === 404) {
					crearUsuario()					
				}

				return response.json()})
			.then(data => setTareas(data));
	}

	

	useEffect(() => {
		
		traerUsuario()
	},[])


	return (
		<div className="text-center">
			<h1 className="titulo col-12">todo</h1>
			<Tarea/>
			
			
		</div>
	);
};

export default Home;