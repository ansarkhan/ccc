import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import './SearchBar.css'

export class SearchBar extends Component {
    state = {
        name: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let url = `/api/images/search/${this.state.name}`;
        await axios.get(url);
        this.props.history.push(`/images/search/${this.state.name}`);
    };

    handleChange = (e) => {
        let afterR = () => {
            if(this.state.name === '' || this.state.name.length === 0) {
                this.props.history.push(`/pictures/`);
            }
        }
        this.setState({
            [e.target.name]: e.target.value
        }, () => afterR());
    };

    render() {
        return (
            <Fragment>
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
                        </div>

                    <button className='btn indigo'> Search </button>
                    </form>

                </div>

            </Fragment>
        )
    }
}

export default withRouter(SearchBar)
