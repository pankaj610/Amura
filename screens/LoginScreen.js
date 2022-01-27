import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        };
    }
    
    onUsernameChange(userName) {

        console.log(userName);
        this.setState({userName: userName});
    }
    onPasswordChange(password) {
        this.setState({password});
    }
    onSubmit() {
        if(this.state.userName!= '' && this.state.password!= '') {
            if(this.state.userName == 'Admin' && this.state.password == 'Admin') {
                this.props.login();
            } else {
                alert('You have entered wrong credentials.');
            }
        } else {
            alert('Enter username or password');
        }
    }
    render() {
        return (<View style={styles.container}>
            <View style={styles.loginContainer}>
                <Text style={styles.heading}>Login </Text>
                <Text>UserName:</Text>
                <TextInput placeholder='Enter your username' style={styles.input} 
                value={this.state.userName} onChangeText={(text)=>this.onUsernameChange(text)}/>
                <Text>Password:</Text>
                <TextInput placeholder='Enter your password' style={styles.input} 
                value={this.state.password} onChangeText={(text)=> this.onPasswordChange(text)}/>
                <Button title="Submit" onPress={this.onSubmit.bind(this)}/>
            </View>
        </View>);
    } 
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    heading: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 30
    },
    input: {
        marginTop: 10,
        marginBottom: 20
    },
    loginContainer: {
        borderWidth: 1,
        borderColor: 'green',
        margin: 20,
        padding: 20
    }
})