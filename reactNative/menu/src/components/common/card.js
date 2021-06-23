import React from 'react';
import {View} from 'react-native';
const Card = props => {
  return <View style={styles.cardStyle}>{props.children}</View>;
};
const styles = {
  cardStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#e0e0e0',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    elevation: 1,
  },
};
export default Card;
