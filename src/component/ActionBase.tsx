import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
  Alert,
} from 'react-native';

import icons from '../images/icons';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface Props {
  style?: StyleProp<ViewStyle>;
  icon?: ImageSourcePropType;
  title: string | any;
  text?: string | any;
}

class ActionBase extends React.PureComponent<Props> {
  handlePress = () => {
    Alert.alert('test');
  };

  render() {
    const {style, icon, title, text} = this.props;

    return (
      <>
        <TouchableOpacity
          style={[styles.container, style]}
          onPress={this.handlePress}>
          {icon && (
            <Image
              style={[styles.icon]}
              source={typeof icon === 'string' ? {uri: icon} : icon}
            />
          )}
          <View style={styles.right}>
            <Text style={[styles.title]}>{title}</Text>
            {text && <Text style={[styles.text]}>{text}</Text>}
          </View>
          <View style={styles.actionsContainer}>
            <Image style={[styles.arrow]} source={icons.ListArrow} />
          </View>
        </TouchableOpacity>
      </>
    );
  }
}

export default ActionBase;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: '#b7b8c4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 55,
  },
  icon: {
    width: 44,
    height: 44 * (240 / 252),
    marginRight: 12,
    resizeMode: 'contain',
  },
  right: {
    flex: 1,
  },
  title: {
    fontSize: fonts.size.base,
    color: colors.ultraBlack,
  },
  text: {
    fontSize: fonts.size.small,
    color: colors.neutralDarker,
  },
  arrow: {
    height: 12,
    resizeMode: 'contain',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
