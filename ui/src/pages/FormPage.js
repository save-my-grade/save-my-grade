import React from 'react';
import logo from '../images/logo.png';
import Clock from "../components/Clock";
import Footer from "../components/Footer";
import ReactDOM from 'react-dom';

import S3FileUpload from 'react-s3';


const config = {
  bucketName: 'fichesbucket',
  region: 'eu-west-1',
  accessKeyId: ' AKIASKOLN6MSQ7435JZC',
  secretAccessKey: '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',
}


class FileInput extends React.Component {
	  constructor(props) {
		  super(props);
		  this.upload = (file) => {
			  S3FileUpload
			  .uploadFile(file, config)
			  .then(data => console.log(data))
			  .catch(err => console.error(err));
	    	};
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.fileInput = React.createRef();
	  }
	  handleSubmit(event) {
	    event.preventDefault();
	    this.upload(this.fileInput)

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
	          <input type="file" ref={this.fileInput} />
	        </label>
	        <br />
	        <button type="submit">Submit</button>
	      </form>
	    );
	  }
	  
	}

function FormPage() {
    return (

    		ReactDOM.render(<FileInput />, document.getElementById('root')
    		)
      
);
}
export default FormPage;