import React from 'react';

class UploadSheetForm extends React.Component {
    constructor(props) {
        super(props);
        const {handleUploadSuccess} = props;
        this.upload = (file) => {
            fetch('/api/upload', {
                method: 'POST',
                body: file
            }).then(
                response => response.json())
                .then(data => handleUploadSuccess(data.body))
                .catch(
                    error => console.log(error)
                );
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.upload(this.fileInput.current.files[0]);
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

export default UploadSheetForm;
