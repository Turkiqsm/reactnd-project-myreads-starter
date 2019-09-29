import React,{Component} from 'react'
import PropTyps from 'prop-types'


class BooklistSearch extends Component{
    static propTypes = {
        Books: PropTyps.array.isRequired,
    }

    
    handleChange = (Book , value)=>{
        if(this.props.update(Book,value)){
            this.props.update(Book , value)
        }
    }
render(){

    const {Books} = this.props  
    return(

        <ol className="books-grid">
        {Books.map((Book)=>(

        <li key={Book.id} >
            <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${Book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                <select
                onChange={(event) => this.handleChange(Book , event.target.value)}
                >
                    <option value="move" disabled>Move to...</option>
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
        </li>
        ) )}
        </ol>
    )
}
}



export default BooklistSearch