import React from 'react';
import { FlatList, Text, View, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


export default class SearchScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: [],
            searchedData: [],
            searchInput: '',
            dropdownValue: '',
            isUp: true
        }
    }

    navigateToProfile(data) {
        this.props.navigation.navigate('ProfileScreen', {profileData: data});
    }

    renderSearchList(row) {
        let data = row.item;
        return <TouchableOpacity style={styles.row} onPress={()=>this.navigateToProfile(data)}> 
            <View style={styles.col}>
                <Text>Name: {data.fullnam}</Text> 
                <Text>Profession: {data.pofession}</Text> 
            </View>
            <Text>Joined: {data.joinedOn}</Text>
        </TouchableOpacity>
    }

    searchData(searchInput) {
        this.setState({searchInput});
        if(searchInput == "" || searchInput == null) {
            this.setState({searchedData:  this.state.response});
        } else {
            let searchedData = [];
            let fromInput = this.state.response;
            fromInput.forEach(el=> {
                for(let key in el) {
                    console.log();
                    if(String(el[key]).indexOf(searchInput) != -1) {
                        searchedData.push(el);
                    }
                }
            });
            this.setState({searchedData: searchedData});
        }
    }

    selectFilter(dropdownValue) {
        this.setState({dropdownValue});
    }

    resetForm() {
        this.setState({searchedData:  this.state.response, searchInput: '',
            dropdownValue: '',
        });
    }

    componentDidMount() {
        fetch('https://retoolapi.dev/PFW5Dr/data').then(res=> res.json()).then(response=> {
            this.setState({response, searchedData: response});
        });
    }

    onUpDownPress() {
        if(this.state.dropdownValue != '' && this.state.dropdownValue != null) {
            this.setState({isUp: !this.state.isUp});
            let fromInput = this.state.response;
            let searchedData = [];
            switch(this.state.dropdownValue) {
                case 'date':
                    searchedData = fromInput.sort((a, b)=> {
                        return this.state.isUp? new Date(a.joinedOn) < new Date(b.joinedOn):
                        new Date(a.joinedOn) > new Date(b.joinedOn);
                    });
                    this.setState({searchedData: searchedData});
                    break;
                case 'name': 
                    searchedData = fromInput.sort((a, b)=> {
                        return this.state.isUp? b.joinedOn.localeCompare(a.joinedOn):
                        a.joinedOn.localeCompare(b.joinedOn);
                    });
                    this.setState({searchedData: searchedData});
                    break;
                case 'profession':
                    searchedData = fromInput.sort((a, b)=> {
                        return this.state.isUp? b.pofession.localeCompare(a.pofession):
                        a.pofession.localeCompare(b.pofession);
                    });
                    this.setState({searchedData: searchedData}); 
                    break;
            }
        } else {
            alert('Select the filter by value.');
        }
    }

    render() {

        return (<View style={styles.container}>
            <TextInput  style={styles.searchInput} placeholder='Search for anything' value={this.state.searchInput} onChangeText={(text)=> this.searchData(text)}></TextInput>
            <Button title={this.state.isUp? 'Up': 'Down'} onPress={()=> this.onUpDownPress()}/>
            <RNPickerSelect
            onValueChange={(value) => this.selectFilter(value)}
            value={this.state.dropdownValue}
            placeholder = {{ 
                label: "Select the inc/dec column", 
                color: 'black'
              }}
              style={{
                inputAndroid: {
                    color: 'black',
                },
              }}
            items={[
                { label: 'Date', value: 'date' },
                { label: 'Name', value: 'name' },
                { label: 'Profession', value: 'profession' },
            ]}
        />

            <Button title="Reset" onPress={()=> this.resetForm()}></Button>
            <FlatList
                renderItem={this.renderSearchList.bind(this)}
                keyExtractor={(v, i) => i}
                data={this.state.searchedData}
            />
        </View>);
    } 
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 10
    },
    col: {
        flex: 1
    },
    searchInput: {
        padding: 10,
    },
    container: {
        flex: 1,
        padding: 10,
    }
})