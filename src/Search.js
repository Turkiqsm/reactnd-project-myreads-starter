import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooklistSearch from './BooklistSearch.js'

class Search extends Component{
    state = {
        query: '',
        Books: [],
    }
    getBookShelf = (book) => {
        for(var i = 0; i < this.props.myBooks.length; i++ ) {
          if(book.id === this.props.myBooks[i].id) {
            return this.props.myBooks[i].shelf;
          }
        }
        return 'none';
      }
    updateShelf = (book ,shelf)=>{

        BooksAPI.update(book,shelf)
        .then((Books)=>{
          this.setState(()=>({
            Books
          }) )
        })
      }
    updateQuery = (query) =>{
        this.setState(()=> ({

            query: query.trim()
        }))
        BooksAPI.search(query)
        .then((Books)=>{
          Books.map(book => book.shelf = this.getBookShelf(book));
          this.setState(()=>({
            Books
          }) )
        })
    }
    render(){
        const {query} = this.state
        return(

            <div className="search-books">
            <div className="search-books-bar">
            <Link 
            to='/'>
              <button className="close-search">Close</button>
            </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                type="text" 
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}

                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              <BooklistSearch
              Books={this.state.Books}
              update = {(book , shelf) =>{
                this.updateShelf(book , shelf)
              }}
            />
              </ol>
            </div>
          </div>




        )

    }
}
export default Search