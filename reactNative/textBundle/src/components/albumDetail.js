import React from 'react';
import {ScrollView, Text, View, Image, Linking} from 'react-native';
import Card from './card';
import CardSection from './cardSection';
import Button from './Button';
const AlbumDetail = props => {
  console.log(props);
  return (
    <Card>
      <CardSection style={styles.cardSectionStyle}>
        <Image source={{uri: props.data.image}} style={styles.imageStyle} />
      </CardSection>
      <CardSection>
        <Image
          source={{uri: props.data.thumbnail}}
          style={styles.thumbnailStyle}
        />
        <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>{props.data.title}</Text>
          <Text style={styles.description}>{props.data.description}</Text>
        </View>
      </CardSection>
      <CardSection style={styles.centerStyle}>
        <Button onPress={() => Linking.openURL(props.data.link)}>
          购买{props.data.title}
        </Button>
      </CardSection>
    </Card>
  );
};
const styles = {
  imageStyle: {
    flex: 1,
    height: 300,
  },
  thumbnailStyle: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    marginRight: 8,
  },
  infoStyle: {
    flex: 1,
  },
  centerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  descriptionStyle: {
    fontSize: 13,
  },
  cardSectionStyle: {
    padding: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    Overflow: 'hidden',
  },
};
export default AlbumDetail;
