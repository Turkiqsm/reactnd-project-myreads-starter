import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search.js'
import Booklist from './Booklist.js'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    Books : [],
    showSearchPage: false
  }

  updateShelf = (book ,shelf)=>{

    BooksAPI.update(book,shelf)
    .then((Books)=>{
      this.setState(()=>({
        Books
      }) )
    })
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then((Books)=>{
      this.setState(()=>({
        Books
      }) )
    })
  }
  render() {
    return (
      <div className="app">
      <Route
      exact path='/'
      render= {()=>(
        <div className="list-books">
        <div className="list-books-title">
        <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
        <div>
            <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
            <Booklist
              Books={this.state.Books}
              Shelf ={'currentlyReading'}
              update = {(book , shelf) =>{
                this.updateShelf(book , shelf)
              }}
            />
            </div>
            </div>
            <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
            <Booklist
              Books={this.state.Books}
              Shelf ={'wantToRead'}
              update = {(book , shelf) =>{
                this.updateShelf(book , shelf)
              }}
            />
            </div>
            </div>
            <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
            <Booklist
              Books={this.state.Books}
              Shelf ={'read'}
              update = {(book , shelf) =>{
                this.updateShelf(book , shelf)
              }}
            />
            </div>
            </div>
        </div>
        </div>
        <div className="open-search">
        <Link 
        to='/Search'>
        <button></button>
        </Link>
        </div>
        </div>

        )} 
      />
    <Route
    exact path='/Search'
    render= {()=>(
        <Search
          myBooks={this.state.Books}
        />
          )}
          />
          </div>
          )
  }
}

export default BooksApp
