import { StyleSheet } from 'react-native';

const BtnStyles = StyleSheet.create({
  
  btnWrapper: {
    borderRadius: 100,
    alignSelf: 'center'
  },
  icon: {
    // backgroundColor: '#2e42db',

    color: 'black',
    textAlign: 'center',
    width: 40,
    

  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  }
});

export default BtnStyles;