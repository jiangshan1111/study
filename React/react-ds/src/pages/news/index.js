import React from 'react';
import { Link } from 'react-router-dom';
class NewsIndex extends React.Component {
  render () {
    return (
      <div>
        <ul>
          <li><Link to='/news/details/1/新闻页面1'>新闻页面1</Link></li>
          <li onClick={() => {
            this.props.history.push(
              {
                pathname: "/news/details",
                search: '?id=2&title=新闻详情2',
                query: {
                  id: 1,
                  title: '新闻详情2'
                }
              }
            )
          }}>新闻页面2</li>
          <li onClick={() => {
            this.props.history.push("/news/details?id=3&title=新闻详情3")
          }}>新闻页面3</li>
        </ul>
      </div>
    )
  }
}
export default NewsIndex