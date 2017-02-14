import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name:''
        }
    }
    render() {
        return (
            <div>
                <h1>Hello!! {this.state.name}</h1>
                <button onClick={()=>{this.setState({name:'이동주'})}}>setName</button>
            </div>
        )
    }
}

export default App;
