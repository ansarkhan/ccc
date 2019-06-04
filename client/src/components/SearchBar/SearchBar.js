import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './SearchBar.css'

export class SearchBar extends Component {
    state = {
        name: ''
    }
    componentDidMount() {
        // let { name } = this.props.album;
        // this.setState({
        //     name: name
        // });

    };

    handleSubmit = async (e) => {
        e.preventDefault();
        let url = `/api/images/search/${this.state.name}`;

        await axios.get(url);
        this.props.history.push('/');
        setTimeout(() => {
            window.location.reload()
        }, 700);
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <Fragment>
                <h3 className="indigo-text">Search</h3>
                <div className="col s12">
                    <form
                        onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                autoComplete="off"
                            />
                            <label htmlFor="name">Tag, Image, or Album Name</label>
                            <button
                            className="btn-floating btn-large indigo custom_btn pulse"
                            type="submit"
                            name="action">
                            <i className="large material-icons">save</i>
                        </button>
                        </div>

                    </form>

                </div>

            </Fragment>
        )
    }
}

export default SearchBar
