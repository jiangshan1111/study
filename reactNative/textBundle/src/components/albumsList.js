import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import AlbumDetail from './albumDetail';
export default class AlbumsList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    fetch('https://jiangshanceshi.oss-cn-beijing.aliyuncs.com/data/data.json')
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        this.setState({
          data: res,
        });
      })
      .catch(error => console.log(error));
  }
  render() {
    let str = [];
    if (this.state.data.length > 0) {
      this.state.data.forEach((el, index) => {
        str.push(<AlbumDetail key={index} data={el} />);
      });
    } else {
      str = <Text>暂无数据</Text>;
    }
    return (
      <ScrollView>
        {str}
        <View style={{paddingBottom: 8}} />
      </ScrollView>
    );
  }
}
