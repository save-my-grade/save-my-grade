import React from 'react';
import logo from '../images/logo.png';
import Clock from "../components/Clock";
import Footer from "../components/Footer";
import ReactDOM from 'react-dom';

class FileInput extends React.Component {
	  constructor(props) {
		  super(props);
		  this.upload = (file) => {
	    	  fetch('/api/upload', { 
	    	    method: 'POST',
	    	    headers: {
	    	      "Content-Type": "You will perhaps need to define a content-type here"
	    	    },
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