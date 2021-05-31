import React from 'react';
class NewsDetails extends React.Component {
  componentDidMount () {
    console.log(this.props)
  }
  render () {
    console.log(this.props)
    return (
      <div>
        111
        <ul>
          {/* <li><Link to='/news/details/1/新闻页面1'>新闻页面1</Link></li> */}
        </ul>
      </div>
    )
  }
}
export default NewsDetails