import React, { Component } from 'react'
import { Text, View, Modal, StyleSheet, TouchableWithoutFeedback,
    TouchableOpacity, TextInput, Platform } from 'react-native'
import DatePicker from 'react-native-modern-datepicker'
import commonStyle from '../commonStyles'
import moment from 'moment'

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component {
    state = {
        ...initialState
    }

    
    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }
        
        this.props.onSave && this.props.onSave(newTask)
        this.setState({...initialState})
    }
    
    getDatePicker = () => {
        let datePicker = <DatePicker
            value={this.state.date} onSelectedChange={date => this.setState({date, showDatePicker: false})}
            mode='date'
        />

        const dateString = moment(this.state.date).format('ddd, D [de] MMMMM [de] YYYY')

        if(Platform.OS === 'android') {
            datePicker = (
                <View style={styles.date}>
                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                        <Text>{dateString}</Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }

    render () {
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>
                        Nova Tarefa
                    </Text>
                    <TextInput placeholder='Informe a Descrição'
                        value={this.state.desc}
                        style={styles.input} onChangeText={desc => this.setState({desc})} />
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={this.props.onCancel}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.save}>
                            <Text>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonStyle.fontFamily,
        backgroundColor: commonStyle.colors.today,
        color: commonStyle.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: commonStyle.fontFamily,
        width: '90%',
        height: 40,
        margin: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyle.colors.today,
    },
    date: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
})