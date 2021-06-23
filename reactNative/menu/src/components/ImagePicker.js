import React, {Component} from 'react';
import {
  View,
  Modal,
  TouchableHighlight,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {Header, CardSection, Button} from './common/index';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  viewStyle: {flex: 1, backgroundColor: 'white'},
  imageStyle: {
    width: (width - 10) / 3 - 10,
    height: (width - 10) / 3 - 10,
  },
  imageContentStyle: {
    width: (width - 10) / 3,
    height: (width - 10) / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlatListStyle: {
    padding: 5,
  },
});

export default class ImagePicker extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {visible, images, onCancel, onSelectImage} = this.props;
    const {viewStyle} = styles;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => {}}>
        <View style={viewStyle}>
          <Header title="选择图片" />
          <FlatList
            style={styles.FlatListStyle}
            data={images}
            initialNumToRender={4}
            renderItem={({item}) => {
              console.log(item.node.image.uri);
              return (
                <TouchableHighlight
                  onPress={() => {
                    onSelectImage(item.node.image);
                  }}
                  style={styles.imageContentStyle}
                  activeOpacity={0.6}
                  underlayColor="white">
                  <Image
                    source={{
                      uri: item.node.image.uri,
                    }}
                    style={styles.imageStyle}
                  />
                </TouchableHighlight>
              );
            }}
            numColumns={3}
            keyExtractor={item => item.node.timestamp}
          />
          <CardSection>
            <View style={{flex: 1}}>
              <Button onPress={onCancel}>
                <Text>关闭</Text>
              </Button>
            </View>
          </CardSection>
        </View>
      </Modal>
    );
  }
}
