import React from 'react';


const SECURITY_CODE = 'PARADIGMA';

const UseState = ({name}) => {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    console.log(state)

    /* const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(''); */

    /* const onValidation = (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
    } */

    //Dos argumentos en useEffect, 1. Funcion 2. Cuando se ejecuta la funcion
    React.useEffect(() => {
        console.log('Empezando el efecto');

        if(state.loading){
            setState({
                ...state,
                error: false,
            });
            setTimeout(() => {
                console.log('Haciendo validacion');
                
                if(state.value === SECURITY_CODE){
                    setState({
                        ...state,
                        error: false,
                        loading: false,
                        confirmed: true
                    });
                }else{
                    setState({
                        ...state,
                        error: true,
                        loading: false
                    });
                } 
                
                console.log('Haciendo validacion');
            }, 3000);
        }
        
        console.log('Terminando el efecto');
    }, [state.loading]);
    

    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p> Por favor, escribe el codigo de seguridad</p>
    
                {state.error && (
                    <p>Error: El estado es incorrecto</p>
                )}
    
                {state.loading && (
                    <p>Cargando...</p>
                )}
    
               {/*  {message && (
                    <p className = {error ? 'text-red-400 ' : 'text-green-500'}>
                        {message}
                    </p>
                )} */}
                
                <input 
                    placeholder = 'Codigo de seguridad' type="text" 
                    value={state.value}
                    onChange = {(event)=>{
                        setState({
                            ...state,
                            value: event.target.value,
                        });
                    }}
                    />
                <button
                    onClick={()=> setState({
                        ...state,
                        loading: true,
                    })}
                >Comprobar</button>
            </div>
        );
    } else if (state.confirmed && !state.deleted){
        return (
            <div>
                <p>Pedimos confirmacion. Estas seguro?</p>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            deleted: true,
                        });
                    }}
                >
                    Si, eliminar
                </button>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false,
                            value: '',
                        });
                    }}
                >
                    No, no lo elimines.
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <p>Eliminado con exito</p>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            deleted: false,
                            confirmed: false,
                            value: '',
                        })
                    }}
                >
                    Resetealo, varon
                </button>
            </div>
        )
    }
}

export { UseState };