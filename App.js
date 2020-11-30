import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  
} from 'react-native';
import { Header, } from 'react-native-elements';
import db from './localdb';
import PSB from './components/PSB';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'pink'}
          centerComponent={{
            text: 'Hear & Learn',
            style: { color: 'black', fontSize: 30 },
          }}
        />
    
         

       
        <Text style={styles.bText}>Enter the word </Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({ text: text });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.findButton}
          onPress={() => {
            var word = this.state.text.toLowerCase().trim();
            db[word]?(
            this.setState({ chunks: db[word].chunks }),
            this.setState({ phonicSounds: db[word].phones })
            ):
           (  this.setState({ chunks: []}),
              alert("The word does not exist, try another word!!"))
          }}>
          <Text style={styles.buttonText}>Find</Text>
        </TouchableOpacity>
        <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PSB
                wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={index}
              />
            );
          })}
         
        </View>
          <Text style={styles.cText}>Creators: Dipneet & Pulkit </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  inputBox: {
    
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  findButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 40,
    backgroundColor: 'pink',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
   cText: {
    textAlign: 'center',
    fontSize: 15,
   
    marginTop:50
  },
   bText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:30,
    marginBottom:20
  },
  
});
