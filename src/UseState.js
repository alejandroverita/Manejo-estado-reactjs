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

    /* 
    const [message, setMessage] = React.useState(''); */

    /* const onValidation = (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
    } */

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true
        });
    };

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        });
    }

    const onWrite =(newValue)=>{
        setState({
            ...state,
            // error: true,
            // loading: false,
            value: newValue,
        });
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
        });
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        });
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        });
    }

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
                    onConfirm();
                }else{
                    onError();
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
                        onWrite(event.target.value)
                    }}
                    />
                <button
                    onClick={()=> {
                        onCheck()
                    }}
                >Comprobar</button>
            </div>
        );
    } else if (state.confirmed && !state.deleted){
        return (
            <div>
                <p>Pedimos confirmacion. Estas seguro?</p>
                <button
                    onClick={() => {
                        onDelete();
                    }}
                >
                    Si, eliminar
                </button>
                <button
                    onClick={() => {
                        onReset();
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
                        onReset();
                    }}
                >
                    Resetealo, varon
                </button>
            </div>
        )
    }
}

export { UseState };