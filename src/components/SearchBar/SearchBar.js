import React from 'react';
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleSearch(term) {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e) {
    this.setState({term: e.target.value}); //comes from onChange value in input
    e.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
