import React from 'react';
import ReactDOM from 'react-dom';

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.upload = (file) => {
            fetch('/api/upload', {
                method: 'POST',
                body: file
            }).then(
                success => console.log(success)
            ).catch(
                error => console.log(error)
            );
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.upload(this.fileInput.current.files[0]);

        alert(
            `Selected file - ${
                this.fileInput.current.files[0].name
                }`
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
                    <input type="file" ref={this.fileInput}/>
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
        );
    }

}

function FormPage() {
    return (

        ReactDOM.render(<FileInput/>, document.getElementById('root')
        )

    );
}

export default FormPage;