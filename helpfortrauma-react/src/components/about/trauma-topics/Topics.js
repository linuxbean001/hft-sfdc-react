import React, { Component } from 'react';

class Topics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            field: {},
            fields: []
        }
    }

    handleChange = (event) => {
        this.state.field[event.target.id] = event.target.value;
    }

    handle= (idx, event) => {
let k = [];
        this.state.fields.forEach((val, index) => {
            if(idx == index) {
                k.push({
                    ...val,
                    [event.target.className] : event.target.value
                })
            } else {
                k.push(val)
            }
        })
        // this.state.fields.splice(index, 1, event.target.value)
    }

    addMore = () => {
        this.setState({
            fields: [...this.state.fields, this.state.field],
        }, function() {
            this.setState({
                field: {}
            })
        })
        console.log('xxxxx xxxxxx form val is ', this.state.fields);

    }

    remove = (index) => {
        this.state.fields.splice(index, 1);
        this.setState({
            fields: this.state.fields
        })
    }

    render() {
        return (
            <div>
                <h3>Trauma Topics</h3>
                {
                    this.state.fields.map((field, index) =>
                        <div key={index}>
                        <button onClick={this.remove.bind(this, index)}>Remove</button>
                            <input type="text" className={'name'} defaultValue={field.name}  onChange={this.handle.bind(this, index)} />
                            <input type="text" className={'cont'} defaultValue={field.cont} onChange={this.handle.bind(this, index)}/>
                            <input type="text" className={'email'} defaultValue={field.email} onChange={this.handle.bind(this, index)} />
                            <hr />
                        </div>
                    )
                }

                <div>
                    <input type="text" id="name" onChange={this.handleChange.bind(this)} />
                    <input type="text" id="cont" onChange={this.handleChange.bind(this)} />
                    <input type="text" id="email" onChange={this.handleChange.bind(this)} />
                    <button onClick={this.addMore}>Add More</button>
                </div>

            </div>
        );
    }
}

export default Topics;
