//This file is the Default entry point into node.js

import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css"; //Importamos una hoja de estilos
import App from "./components/App";
import * as serviceWorker from "./serviceWorker"; //Usado para trabajar offline y mejorar el rendimeinto de la aplicación

// Utiliza ReactDOM.render() para renderizar el componente principal de la aplicación (<App />)
//  en el elemento del DOM con el ID "root".
// Esto significa que el componente App será la raíz de la interfaz de usuario
// y se insertará en el elemento del DOM con el ID "root". Este es un patrón común en aplicaciones React.
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//Los service workers son scripts
//que se ejecutan en segundo plano y se utilizan para funciones como trabajar offline
// o mejorar el rendimiento de la aplicación.

//Qué es el DOM de ReactDOM

// El DOM, o Document Object Model (Modelo de Objetos del Documento), es una representación programática y
// estructurada de un documento HTML o XML. En el contexto del desarrollo web, cuando un navegador carga una página web,
// construye internamente un modelo de objetos que representa la estructura y el contenido del documento. Este modelo
// permite a los programadores acceder, manipular y modificar dinámicamente el contenido, la estructura y el estilo
// de una página web. El DOM se orgnia en un árbol de nodos.
