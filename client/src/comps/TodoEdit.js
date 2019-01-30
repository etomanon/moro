import React, { Component } from 'react'

export default class TodoEdit extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    }
  }
  componentDidMount() {
    this.updateText(this.props.text);
    this.input.focus();
  }
  onChange = e => {
    const { value } = e.target;
    this.updateText(value);
  }
  onSubmit = e => {
    e.preventDefault();
    const { text } = this.state;
    if (text === '') return;
    this.props.todosEditText(this.props.id, text);
  }
  updateText = (text) => {
    this.setState({
      text
    });
  }
  render() {
    const { id, todosEditToggle } = this.props;
    return (
      <li className="todo-edit">
        <form onSubmit={this.onSubmit}>
          <input
            onBlur={e => todosEditToggle(id)}
            ref={ref => this.input = ref}
            onChange={this.onChange}
            value={this.state.text}
            type="text"
            className="todo-edit__input"
          />
        </form>
      </li>
    )
  }
}
