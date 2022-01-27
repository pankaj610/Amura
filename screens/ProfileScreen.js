import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class ProfileScreen extends React.Component {

    constructor(props) {
        super(props); 
    }
   
    componentDidMount() {
        
    }

    getShortName(name) {
        return name.split(" ").map(el=> el[0].toUpperCase()).join("");
    }

    render() {
        const { profileData } = this.props.route.params;
        // console.log(this.props.route);
        return (<View style={styles.row}>
            <View style={styles.col}>
                <View style={styles.profileImage}>
                    <Text style={styles.profileText}>{this.getShortName(profileData.fullnam)}</Text>
                </View>
                <Text>Name: {profileData.fullnam}</Text> 
                <Text>Profession: {profileData.pofession}</Text> 
                <Text>Joined: {profileData.joinedOn}</Text>
            </View>
        </View>);
    } 
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: 'green',
        margin: 10,
    },
    col: {
        flex: 1,
        alignItems: 'center'
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: "green",
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileText: {
        color: 'white',
        fontSize: 20
    }
})