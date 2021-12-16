# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

**UseState.js **

import React from 'react'

    export default function UseState() {
      return (
        <div>
          <h2>Eliminar UseState</h2>
          <p>Por favor, escriba el código de seguridad.</p>
          <input type='text' placeholder='código de seguridad'/>
          <button>Comprobar</button>
        </div>
      )
    }

**classState**

    import React, { Component } from 'react'

    export default class ClassState extends Component {
      render() {
    	return (
    	  <div>
    		<h2>Eliminar ClassState</h2>
    		<p>Por favor, escriba el código de seguridad.</p>
    		<input type='text' placeholder='código de seguridad'/>
    		<button>Comprobar</button>
    	  </div>
    	)
      }
    }

![AppState](https://static.platzi.com/media/user_upload/appStates-f51afbfc-64e3-4bbc-a707-bf7b98c6c3bd.jpg "AppState")

### Manejo de estado en clases

- En el método constructor utilizamos this.state para definir un objeto cuyas propiedades serán los estados
- Para poder modificar this y conservar lo que vivía en this de la clase que extendemos se debe llamar a super() dentro del método constructor.
- Luego debemos recibir las props desde el constructor y enviarle a super todas las propiedades que recibimos, de esta forma no solo vivirán en el constructor de nuestra clase sino también pasar a la clase React.component
- Una propiedad que viene de React.component es this.setState, con esta modificaremos los estados.

        class ClassState extends React.Component {
            constructor(props){
                super(props);
                this.state = {
                    error:false,
                }
            }

        render () {
            return (
                <div>
                    <h2>Eliminar {this.props.name}</h2>
                    <p>Por favor, escriba el código de seguridad.</p>

                    {this.state.error && (
                        <p>El código es es incorrecto</p>
                    )}

                    <input type='text' placeholder='código de seguridad'/>
                    <button
                        // onClick={()=>this.setState({ error: !this.state.error})}
                        onClick={()=>this.setState(prevState => ({error: !prevState.error}))}
                    >Comprobar</button>
                </div>
            );
        }
        }

### React.useEffect es un método con 2 parámetros:

1. El primero, siempre se usa y es una función a ejecutar.

2. El segundo, opcional e importante, nos indica cuando se va a ejecutar nuestro primer parámetro. Los posibles valores de este parámetro son:

   1. Ningun valor: esta función se ejecutará cada vez que nuestro componente haga render (es decir, cada vez que haya cambios en cualquiera de nuestros estados).

   2. Arreglo vacio: nuestro efecto solo se ejecuta una vez, cuando recién hacemos el primer render de nuestro componente.

   3. Arreglo no vacio: O también podemos enviar un array con distintos elementos para decirle a nuestro efecto que no solo ejecute en el primer render, sino también cuando haya cambios en esos elementos del array.

### Estado simple con useState:

    // Así se declaran
    const [ value, setValue ] = React.useState('');
    const [ error, setError ] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);

    // Así se consumen
    console.log(loading);

    // Así se actualizan
    setLoading(true);

### Estado compuesto con useState:

    // Así se declaran
    const [ state, setState ] = React.useState({
    value: '',
    error: false,
    loading: false,
    });

    // Así se consumen
    console.log(state.loading);

    // Así se actualizan
    setState({
       ...state,
       error: true,
       loading: false,
    })

### Estado compuesto con classState (no hay estados simples):

    // Así se declaran
    constructor(props) {
       super(props);

       this.state = {
    	   value: '',
    	   error: false,
    	   loading: false,
       }
    }

    // Así se consumen
    console.log(this.state.loading);

    // Así se actualizan
    this.setState({ error: true, loading: false });

### ¿Qué es un reducer?

Son una herramienta que nos permite declarar todos los posibles estados de nuestra App para llamarlos de forma declarativa.
Necesitan 2 objetos esenciales: los estados compuestos y las acciones.

**Los estados compuestos:**

- Son un objeto donde van a vivir como propiedades todos nuestros estados

**Acciones**

- Responsables, al ser disparados, de pasar de un estado a otro.
- Este objeto tiene 2 propiedades: action type y action payload.

**Action type:**

- Define el nombre clave para encontrar el nuevo estado.

**Action payload:**

- Es opcional e importante con estados dinámicos. Un estado es dinamico cuando depende del llamado de un API, de lo escrito por el usuario en un input, etc. Estos son estados dinámicos y los recibimos con un payload.

**Flujo de trabajo:**

- Definimos distintos tipos de acciones con type y payload.
- Enviamos estas acciones a nuestro reducer.
- El reducer define los posibles estados por donde pasara nuestra App.
- Con action type elegimos cual de esos estados queremos disponer con el cambio o evento del usuario.
- Con action payload damos dinamismo a dicho estado. Será el mismo estado pero le daremos características especiales
