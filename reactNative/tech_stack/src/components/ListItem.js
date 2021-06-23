import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import {CardSection} from './common';
import {connect} from 'react-redux';
import {selectTech} from '../actions/index';
// import * as actions from '../actions/index';
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
  },
  viewStyle: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  descriptionStyle: {
    fontSize: 16,
    paddingLeft: 32,
  },
});
class ListItem extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  componentDidUpdate() {
    console.log(this.props);
    LayoutAnimation.linear();
  }
  renderDescription(description) {
    const {descriptionStyle} = styles;
    if (this.props.selected) {
      return (
        <CardSection>
          <View>
            <Text style={descriptionStyle}>{description}</Text>
          </View>
        </CardSection>
      );
    }
  }
  render() {
    const {textStyle, viewStyle} = styles;
    const {id, title, description} = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => this.props.selectTech(id)}>
        <View>
          <CardSection>
            <View style={viewStyle}>
              <Text style={textStyle}>{title}</Text>
            </View>
          </CardSection>
          {this.renderDescription(description)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
export default connect(
  (state, ownProps) => {
    // console.log(ownProps, state.selection);
    return {
      selected: ownProps.id === state.selection,
    };
  },
  {selectTech},
  // actions,
)(ListItem);
