import React, {Component} from 'react';
import {CardSection} from './common/index';
import {foodActions} from '../actions/index';
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
const styles = StyleSheet.create({
  headerButtonStyle: {
    marginRight: 16,
  },
  headerRightTextStyle: {
    fontSize: 32,
    color: '#007AFF',
  },
  loadingContentStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  headerTitleStyle: {
    fontSize: 18,
  },
  listItemStyle: {
    flexDirection: 'row',
  },
  listItemImageStyle: {
    height: 60,
    width: 60,
    marginRight: 30,
  },
  listItemTextStyle: {
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
  },
  listItemTextTitleStyle: {
    fontSize: 16,
    fontWeight: '600',
  },
});
const getTableList = () => {
  return fetch('http://192.168.250.200:8080/getFoods', {})
    .then(res => {
      return res.json();
    })
    .then(res => {
      return res;
    })
    .catch(error => console.log(error));
};
class MenuListScreen extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '菜单',
    headerTitle: () => <Text style={styles.headerTitleStyle}>菜单</Text>,
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerButtonStyle}
        onPress={() => {
          navigation.navigate('food', {
            page: 'menuList',
            callBack: () => {
              navigation.state.params.getTableList();
              //在此调接口或者改变state会让页面改变
            },
          });
        }}>
        <Text style={styles.headerRightTextStyle}>+</Text>
      </TouchableOpacity>
    ),
    headerTitleAlign: 'center',
  });
  constructor(props) {
    super(props);
    this.state = {
      menuList: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.getTableList();
    this.props.navigation.setParams({
      getTableList: this.getTableList.bind(this),
    });
  }
  //获取商品列表
  getTableList() {
    this.setState({
      loading: true,
    });
    getTableList().then(res => {
      this.setState({
        menuList: res,
        loading: false,
      });
    });
  }
  //点击跳转商品详情页
  updateInfo(info) {
    this.props.updateFoodInfo(info);
    this.props.navigation.navigate('food', {
      isUpdate: true,
      page: 'menuList',
      callBack: () => {
        this.getTableList();
        //在此调接口或者改变state会让页面改变
      },
    });
  }
  //x渲染商品列表
  renderMenuList() {
    let str = [];
    if (this.state.menuList.length > 0) {
      this.state.menuList.forEach(element => {
        let sourceUri = element.imageSrc
          ? element.imageSrc
          : 'https://ucenter.51cto.com/avatar.php?uid=14913590&size=middle';
        str.push(
          <CardSection key={element._id}>
            <TouchableOpacity
              style={styles.listItemStyle}
              onPress={this.updateInfo.bind(this, element)}>
              <Image
                source={{
                  uri: sourceUri,
                }}
                style={styles.listItemImageStyle}
              />
              <View>
                <Text
                  style={[
                    styles.listItemTextStyle,
                    styles.listItemTextTitleStyle,
                  ]}>
                  {element.foodName}
                </Text>
                <Text style={styles.listItemTextStyle}>
                  价格：{element.price}元
                </Text>
              </View>
            </TouchableOpacity>
          </CardSection>,
        );
      });
    } else {
      str = <Text>暂无数据</Text>;
    }
    return str;
  }
  renderContent() {
    const {loadingContentStyle, loadingStyle} = styles;
    if (this.state.loading) {
      return (
        <View style={loadingContentStyle}>
          <ActivityIndicator
            style={loadingStyle}
            size="large"
            color="#e0e0e0"
          />
        </View>
      );
    } else {
      return <ScrollView>{this.renderMenuList()}</ScrollView>;
    }
  }
  render() {
    return <View style={{flex: 1}}>{this.renderContent()}</View>;
  }
}
export default connect(null, {
  updateFoodInfo: foodActions.updateFoodInfo,
})(MenuListScreen);
