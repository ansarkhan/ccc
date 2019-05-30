import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './Edit.css'

export class EditAlbum extends Component {
    state = {
        albumName: ''
    }
    componentDidMount() {
        let { name } = this.props.album;
        this.setState({
            albumName: name
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        let id = Object.values(this.props.match.params)[0];
        let url = `/api/albums/${id}`;
        let obj = {
            "name": this.state.albumName
        }
        console.log(obj)
        await axios.post(url, obj);
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

    handleDelete = async (e) => {
        e.preventDefault();
        let id = Object.values(this.props.match.params)[0];
        let url = `/api/albums/${id}`;
        await axios.delete(url);
        this.props.history.push('/');
        setTimeout(() => {
            window.location.reload()
        }, 500);
    }

    render() {
        return (
            <Fragment>
                <h1 className="indigo-text">View & Edit</h1>
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
                            <label htmlFor="albumName">Album Name</label>
                        </div>

                        <button
                            className="btn red custom_delete"
                            onClick={e =>
                                window.confirm(`Are you sure you wish to delete ${this.state.albumName}?`) &&
                                this.handleDelete(e)
                            }
                        >
                            Delete
                        </button>

                        <button
                            className="btn-floating btn-large indigo custom_btn pulse"
                            type="submit"
                            name="action">
                            <i className="large material-icons">save</i>
                        </button>

                    </form>

                </div>

            </Fragment>
        )
    }
}

export default EditAlbum
