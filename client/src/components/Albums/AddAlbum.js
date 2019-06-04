import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './Edit.css'

export class AddAlbum extends Component {
    state = {
        albumName: ''
    }
    componentDidMount() {
        // let { name } = this.props.album;
        // this.setState({
        //     albumName: name
        // });

    };

    handleSubmit = async (e) => {
        e.preventDefault();
        let url = `/api/albums/`;
        let obj = {
            "createdAt": Date.now(),
            "name": this.state.albumName
        }

        console.log(obj)
        await axios.post(url, obj);
        this.props.history.push('/albums');
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
                <h3 className="indigo-text">All Albums</h3>
                <div className="col s12">
                    <form
                        onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <input
                                id="albumName"
                                type="text"
                                name="albumName"
                                value={this.state.albumName}
                                onChange={this.handleChange}
                                autoComplete="off"
                            />
                            <label htmlFor="albumName">Add Album</label>
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

export default AddAlbum
