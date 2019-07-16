import React, { Component } from 'react';

import {graphql, compose} from 'react-apollo';
import {getAuthorsQuery,addBookMutation, getBooksQuery} from '../queries/queries';

class AddBook extends Component {
  constructor(props){
      super(props);
      this.state = {
        name:'',
        genre:'',
        authorId:'',
        error:{}
      };
      this.myForm = React.createRef(); //Creating Ref
  }

  displayAuthors(){
    var data = this.props.getAuthorsQuery;
    if(data.loading){
      return ( <option disabled>Loading authors ... </option>);
    } else {
      return data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name } </option>);
      });
    }

  }

  submitForm(e){
      e.preventDefault();
      if(!this.state.name || !this.state.genre || !this.state.authorId){
          this.setState({error:{
            name:!this.state.name,
            genre: !this.state.genre,
            author: !this.state.authorId
          }});
          return;
      }


      //Adding variable to mutation so insert state data to database
      this.props.addBookMutation({
        variables:{
          name: this.state.name,
          genre: this.state.genre,
          authorId: this.state.authorId
        },
        refetchQueries: [{query: getBooksQuery}]
      });

      //Initalize blank('') value to from components
     this.myForm.current.reset();
  }

  render() {
    return (
      <form  ref={this.myForm} id='add_book' onSubmit={this.submitForm.bind(this)}>
        <div className='field'>
          <label> Book name: </label>
          <input className={this.state.error.name ? 'error' : ''} type='text' placeholder={"enter book  Name *"} onChange={(e) => this.setState({name: e.target.value})}/>
        </div>

        <div className='field'>
          <label>Genre: </label>
          <input  className={this.state.error.genre ? 'error' : ''} placeholder={"Enter book genre * "} type='text' onChange={(e) => this.setState({genre: e.target.value})}/>
        </div>

        <div className='field'>
          <label>Author: </label>
          <select className={this.state.error.author ? 'error' : ''} onChange={(e) => this.setState({authorId: e.target.value})} >
            <option>Select author </option>
            {this.displayAuthors()}
            </select>
        </div>

          <button id="add-book-button" title="Add Book "> {'+'} </button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name:'getAuthorsQuery'}),
  graphql(addBookMutation, {name:'addBookMutation'}))(AddBook);
