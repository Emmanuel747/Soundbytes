import { StyleSheet } from 'react-native';

const PostStyles = StyleSheet.create({

  //userInfo Header
  headerBtnContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-around',
  },
  icon2: {
    color: 'black',
    borderRadius: 10,
    textAlign: 'center',
    borderColor: 'blue',
    padding: 5
  },
  imgContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
    
  },
  Logo: {
    width: 96,
    height: 96,
    margin: 9,
    borderRadius: 100,
  },

  //Feed section
  rootContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    overflow: 'scroll'
  },
  //Individual Post components
  subContainer: {
    backgroundColor: 'lightgrey',
    margin: 10,
    height: 100,
    width: 330,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.23,
     shadowRadius: 2.62,
     elevation: 4,
  },
  icon: {
    backgroundColor: '#2e42db',
    marginRight: 7,
    color: 'black',
    borderRadius: 100,
    textAlign: 'center',
    width: 60,
    borderColor: 'blue'
  },

  centerRowAligment: {
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: "center",
    textAlign: 'center',
    padding: 5,
    paddingHorizontal: 10,

  },
  "centerColumnAligment": {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },

  subInfo: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'space-around',
  }
});

export default PostStyles;