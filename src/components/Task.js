import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback,
    TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyle from '../commonStyles'

export default props => {
    const donoOrNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formatteDate = moment(date).local('pt-br').format('ddd, D [de] MMMM')

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}>
                <Icon name='trash' size={30} color='#FFF'/>
            </TouchableOpacity>
        )
    }

    return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() =>props.toggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>

                <View>
                    <Text style={[styles.desc, donoOrNotStyle]}>{props.desc}</Text>
                    <Text style={styles.date}>{formatteDate}</Text>
                </View>
            </View>
    )
}

function getCheckView(doneAt) {
    if(doneAt != null){
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color={'#fff'}></Icon>
            </View>
        )
    }
    return (
        <View style={styles.pending}></View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 12.5,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 12.5,
        backgroundColor: '#4d7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyle.fontFamily,
        color: commonStyle.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyle.fontFamily,
        color: commonStyle.colors.subText,
        fontSize: 12
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    }
})