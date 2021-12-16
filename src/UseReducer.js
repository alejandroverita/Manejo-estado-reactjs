import React from 'react';


const SECURITY_CODE = 'PARADIGMA';

const UseReducer = ({name}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    console.log(state);

    const onLoading = () => dispatch({type: actionTypes.LOADING})
    const onConfirm = () => dispatch({type: actionTypes.CONFIRM})
    const onError = () => dispatch({type: actionTypes.ERROR})
    const onCheck = () => dispatch({type: actionTypes.CHECK})
    const onDelete = () => dispatch({type: actionTypes.DELETE})
    const onReset = () => dispatch({type: actionTypes.RESET})

    const onWrite =({target})=>{
        dispatch({type: actionTypes.WRITE, payload: target.value})
    }


    //Dos argumentos en useEffect, 1. Funcion 2. Cuando se ejecuta la funcion
    React.useEffect(() => {
        console.log('Empezando el efecto');

        if(state.loading){
            onLoading();
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
                    onChange = { onWrite} />
                <button onClick={onCheck}>Comprobar</button>
            </div>
        );
    } else if (state.confirmed && !state.deleted){
        return (
            <div>
                <p>Pedimos confirmacion. Estas seguro?</p>
                <button onClick={onDelete}>
                    Si, eliminar
                </button>
                <button onClick={onReset} >
                    No, no lo elimines.
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <p>Eliminado con exito</p>
                <button onClick={onReset}>
                    Resetealo, varon
                </button>
            </div>
        )
    }
}



//Para un reducer necesitamos estados compuestos
const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

//2 parametros: estado y accion

//Una forma de usar el reducer es con IF
const reducerIF = (state, action) => {
    if (action.type === 'ERROR') {
        return {
            ...state,
            error: true,
            loading: false,
        }
    } else if (action.type === 'CONFIRM') {
        return {
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        }
    } else {
        return {
            ...state,
        }
    }
}

//Otra forma de usar el reducer es el SWITCH
const reducerSWITCH = (state, action) => {
    switch (action.type) {
        case 'ERROR':
            return {
                ...state,
                error: true,
                loading: false,
            };
        case 'CONFIRM':
            return {
                ...state,
                error: false,
                loading: false,
                confirmed: true,
            };
        default:
            return {
                ...state,
            };
    }
}

const actionTypes = {
    LOADING: 'LOADING',
    CONFIRM: 'CONFIRM',
    CHECK: 'CHECK',
    WRITE: 'WRITE',
    ERROR: 'ERROR',
    DELETE: 'DELETE',
    RESET: 'RESET',
};

//3era forma usando OBJETOS
const reducerOBJECT = (state, payload) => ({
    [actionTypes.LOADING]:{
        ...state,
        loading: true,
        error: false,
    },

    [actionTypes.CONFIRM]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },

    [actionTypes.CHECK]: {
        ...state,
        loading: true,
    },
    
    [actionTypes.WRITE]: {
        ...state,
        // error: true,
        // loading: false,
        value: payload,
    },
    
    [actionTypes.ERROR]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.DELETE]: {
        ...state,
        deleted: true,
    },

    [actionTypes.RESET]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
})
  
const reducer = (state, action) => {
    return reducerOBJECT(state, action.payload)[action.type] || state;
}


export { UseReducer };
