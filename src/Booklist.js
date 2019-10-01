import React,{Component} from 'react'
import PropTyps from 'prop-types'


class Booklist extends Component{
    static propTypes = {
        Books: PropTyps.array.isRequired,
    }

    
    handleChange = (Book , value)=>{
        if(this.props.update(Book,value)){
            this.props.update(Book , value)
        }
    }
render(){
    const {Books,Shelf} = this.props
    // const ShlefBooks = Books.filter((book) => (
    //         book.shelf.includes(Shelf)
    //     ))    
    return(

        <ol className="books-grid">
        {Books.map((Book)=>(
         Book.shelf === Shelf 
        && (   <li key={Book.id} >
            <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${Book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                <select
                value={Shelf}
                onChange={(event) => this.handleChange(Book , event.target.value)}
                >
                    <option  value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                </div>
            </div>
                <div className="book-title">{Book.title}</div>
                <div className="book-authors">{Book.authors}</div>
            </div>
        </li>) 
     
        ) )}
        </ol>
    )
}
}



export default Booklist