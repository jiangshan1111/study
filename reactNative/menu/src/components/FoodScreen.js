import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {connect} from 'react-redux';
import {Input, Button, Card, CardSection, Confirm} from './common/index';
import {ImagePicker} from './index';
const uuid = require('uuid');
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  imageStyle: {
    width: width / 2,
    height: width / 2,
  },
  imageContentStyle: {
    flex: 2,
  },
  textStyle: {
    fontSize: 16,
    flex: 1,
  },
});

class FoodScreen extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '菜',
    headerTitleAlign: 'center',
  });
  constructor(props) {
    super(props);
    const {foodName, imageSrc, _id, price} = this.props.food;
    if (this.props.navigation.state.params.isUpdate) {
      this.state = {
        foodName: foodName,
        imageSrc: imageSrc,
        _id: _id,
        price: String(price),
        isUpdate: true,
        saveLoading: false,
        deleteLoading: false,
        showDeleteConfirm: false,
        showFoodImageModal: false,
        images: [],
      };
    } else {
      this.state = {
        foodName: '',
        price: '',
        imageSrc: '',
        saveLoading: false,
        deleteLoading: false,
        isUpdate: false,
        _id: 0,
        showDeleteConfirm: false,
        showFoodImageModal: false,
        images: [],
      };
    }
  }
  componentDidMount() {
    CameraRoll.getPhotos({
      first: 30,
      assetType: 'All',
    }).then(res => {
      this.setState({
        images: res.edges,
      });
    });
    //获取本地图片
  }
  fetchSaveFood(foodName, price, imageSrc, _id) {
    fetch(
      this.state.isUpdate
        ? 'http://192.168.250.200:8080/updateFood'
        : 'http://192.168.250.200:8080/setNewFood',
      {
        method: 'post',
        body: JSON.stringify(
          this.state.isUpdate
            ? {
                foodName: foodName,
                imageSrc: imageSrc,
                price: price,
                id: _id,
              }
            : {
                foodName: foodName,
                imageSrc: imageSrc,
                price: price,
              },
        ),
        headers: {'Content-Type': 'application/json'},
      },
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        this.setState({
          saveLoading: false,
        });
        this.props.navigation.goBack();
        this.props.navigation.state.params.callBack('回调参数');
      })
      .catch(error => {
        this.setState({
          saveLoading: false,
        });
        console.log(error);
      });
  }
  uploadFile(foodName, price, imageSrc, _id) {
    const fileObj = {
      uri: imageSrc,
      name:
        uuid.v4() + '.' + imageSrc.split('.')[imageSrc.split('.').length - 1],
      type: 'image/jpg',
    };
    const body = new FormData();
    body.append('file', fileObj);
    console.log(body);
    fetch('http://192.168.250.200:8080/uploadFile', {
      method: 'POST',
      body: body,
      headers: {
        Accept: 'application/json',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        this.fetchSaveFood(
          foodName,
          price,
          'http://192.168.250.200:8080/public/' + res.filename,
          _id,
        );
      });
  }
  saveFoodInfo() {
    this.setState({
      saveLoading: true,
    });
    const {foodName, price, imageSrc, _id} = this.state;
    if (imageSrc) {
      if (
        imageSrc.split('://')[0] !== 'http' &&
        imageSrc.split('://')[0] !== 'https'
      ) {
        this.uploadFile(foodName, price, imageSrc, _id);
      } else {
        this.fetchSaveFood(foodName, price, imageSrc, _id);
      }
    } else {
      this.fetchSaveFood(foodName, price, imageSrc, _id);
    }
  }
  deleteFoodInfo() {
    this.setState({
      saveLoading: true,
    });
    const {_id} = this.state;
    fetch('http://192.168.250.200:8080/deleteFood?id=' + _id)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        this.setState({
          saveLoading: false,
        });
        this.props.navigation.goBack();
        this.props.navigation.state.params.callBack('回调参数');
      })
      .catch(error => {
        this.setState({
          saveLoading: false,
        });
        console.log(error);
      });
  }
  cancelDeleteConfirm() {
    this.setState({
      showDeleteConfirm: false,
    });
  }
  cancelFoodImageModal() {
    this.setState({
      showFoodImageModal: false,
    });
  }
  renderSaveButton() {
    if (this.state.saveLoading) {
      return (
        <CardSection>
          <View style={{flex: 1}}>
            <ActivityIndicator color="#e0e0e0" />
          </View>
        </CardSection>
      );
    } else {
      return (
        <CardSection>
          <View style={{flex: 1}}>
            <Button onPress={this.saveFoodInfo.bind(this)}>
              <Text>保存</Text>
            </Button>
          </View>
        </CardSection>
      );
    }
  }
  onSelectImage(image) {
    console.log(1);
    this.setState({
      showFoodImageModal: false,
      imageSrc: image.uri,
    });
  }
  renderDeleteButton() {
    if (!this.state.isUpdate) {
      return false;
    }
    if (this.state.deleteLoading) {
      return (
        <CardSection>
          <View style={{flex: 1}}>
            <ActivityIndicator color="#e0e0e0" />
          </View>
        </CardSection>
      );
    } else {
      return (
        <CardSection>
          <View style={{flex: 1}}>
            <Button
              onPress={() => {
                this.setState({showDeleteConfirm: true});
              }}>
              <Text>删除</Text>
            </Button>
          </View>
        </CardSection>
      );
    }
  }
  render() {
    const {textStyle, imageContentStyle, imageStyle} = styles;
    const {foodName, price, imageSrc} = this.state;
    const sourceUri = imageSrc
      ? imageSrc
      : 'https://ucenter.51cto.com/avatar.php?uid=14913590&size=middle';
    return (
      <Card>
        <CardSection>
          <Input
            label="菜名"
            value={foodName}
            onChangeText={foodname =>
              this.setState({
                foodName: foodname,
              })
            }
            placeholder="请输入菜名"
          />
        </CardSection>
        <CardSection>
          <Text style={textStyle}>图片</Text>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="white"
            onPress={() => this.setState({showFoodImageModal: true})}
            style={imageContentStyle}>
            <Image
              source={{
                uri: sourceUri,
              }}
              style={imageStyle}
            />
          </TouchableHighlight>
        </CardSection>
        <CardSection>
          <Input
            label="价格"
            value={price}
            keyboardType="numeric"
            onChangeText={text =>
              this.setState({
                price: text,
              })
            }
            placeholder="请输入价格（元）"
          />
        </CardSection>
        {this.renderSaveButton()}
        {this.renderDeleteButton()}
        <Confirm
          visible={this.state.showDeleteConfirm}
          onAccept={this.deleteFoodInfo.bind(this)}
          onCancel={this.cancelDeleteConfirm.bind(this)}>
          您真的要删除这道菜吗？
        </Confirm>
        <ImagePicker
          onSelectImage={this.onSelectImage.bind(this)}
          images={this.state.images}
          visible={this.state.showFoodImageModal}
          onCancel={this.cancelFoodImageModal.bind(this)}
        />
      </Card>
    );
  }
}
export default connect(state => {
  return {
    food: state.food,
  };
})(FoodScreen);
