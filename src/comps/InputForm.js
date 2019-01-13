import React, { Component } from 'react'

export default class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    }
  }
  onChange = e => {
    this.setText(e.target.value);
  }
  onSubmit = e => {
    e.preventDefault();
    const { text } = this.state;
    if (text === '') return;
    this.props.todosAdd(text);
    this.setText('');
  }
  setText = text => {
    this.setState({
      text
    });
  }
  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className="input-form u-mt-m"
      >
        <input
          type='text'
          placeholder="Write todo"
          className="input-form__text"
          value={this.state.text}
          onChange={this.onChange}
        />
      </form>
    )
  }
}
