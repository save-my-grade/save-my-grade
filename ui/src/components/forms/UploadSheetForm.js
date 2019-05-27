import React from 'react';
import classNames from "classnames";

class UploadSheetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isUploading: false};
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
        if (!this.fileInput.current.files[0]) {
            alert("Veuillez sélectionner un fichier");
        } else {
            this.setState({isUploading: true});
            this.upload(this.fileInput.current.files[0]);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="file is-centered is-boxed">
                    <label className="file-label">
                        <input className="file-input" type="file" ref={this.fileInput}/>
                        <span className="file-cta">
                            <span className="file-label">
                                Sélectionnez un fichier...
                            </span>
                        </span>
                    </label>
                </div>
                <br/>
                <button type="submit"
                        className={classNames("button", "is-info", {'is-loading': this.state.isUploading})}
                        disabled={this.state.isUploading}>Mettre en ligne
                </button>
            </form>
        );
    }

}

export default UploadSheetForm;