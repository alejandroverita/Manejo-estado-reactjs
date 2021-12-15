import React from 'react';

const SECURITY_CODE = 'PARADIGMA';

class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : '',
            error: false,
            loading: false, 
        };
    }

    componentDidUpdate(){
        console.log('Actualizandoo..!');

        
        if(this.state.loading) {
            
            setTimeout(() => {
                console.log('Haciendo la actualizacion');

                if(SECURITY_CODE === this.state.value){

                    this.setState({error: false, loading: false});
                }
                else {
                    this.setState({loading: false, error: true})
                }

                console.log('Terminando la actualizacion');
            }, 3000);
        }
    }

    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p> Por favor, escribe el codigo de seguridad</p>
                {(this.state.error && !this.state.loading) && (
                    <p>Error: el codigo es incorrecto</p>
                )}
                {this.state.loading && (
                    <p>Cargando...</p>
                )}
                <input 
                    placeholder = 'Codigo de seguridad' type="text" 
                    value = {this.state.value}
                    onChange = {(e)=> {
                        this.setState({value: e.target.value});
                    }}
                    />
                <button
                    //onClick = {() => this.setState({error: !this.state.error})}
                    onClick = {() => this.setState({loading: true})}
                >Comprobar</button>
            </div>
        );
    }
}

export { ClassState };