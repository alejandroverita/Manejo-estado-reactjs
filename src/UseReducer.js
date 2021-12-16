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

//3era forma usando OBJETOS
const reducerOBJECT = (state) => ({
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CONFIRM': {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
})
  
const reducer = (state, action) => {
    if (reducerOBJECT(state)[action.type]) {
        return reducerOBJECT(state)[action.type];
    } else {
        return {
            ...state,
        }
    }
}
