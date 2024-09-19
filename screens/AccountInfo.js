import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { DataSyncManager } from '../storage/dataService';
import { DefaultButton } from '../components';
import { COLORS } from '../constants';
import { useData } from '../storage/storageService';

const AccountInfo = ({ navigation }) => {
    const { logout, updateUserData } = DataSyncManager();
    const { user } = useData();
    const [newEmail, setNewEmail] = useState(user.email);
    const [newUsername, setNewUsername] = useState(user.username);
    const [newPassword, setNewPassword] = useState('');
    const [changedDetails, setChangedDetails] = useState(false);
    const [message, setMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    function test() {
        updateUserData(newUsername === user.username ? undefined : newUsername, newEmail === user.email ? undefined : newEmail, newPassword || undefined).then((response) => {
            setIsSuccess(response === 'success');
            setMessage(response);
            setTimeout(() => {setMessage(null)}, 2000)
        });
    }

    useEffect(() => {
        console.log(user);
        setChangedDetails(newEmail !== user.email || newUsername !== user.username || newPassword !== '');
    }, [newEmail, newUsername, newPassword, user])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Change Account Details</Text>
            <TextInput style={styles.input} placeholder='Email' value={newEmail} onChangeText={setNewEmail}/>
            <TextInput style={styles.input} placeholder='Username' value={newUsername} onChangeText={setNewUsername}/>
            <TextInput style={styles.input} placeholder='New Password' value={newPassword} onChangeText={setNewPassword} secureTextEntry/>
            {message && <Text style={[styles.message, isSuccess ? styles.success : styles.error]}>{message}</Text>}
            {changedDetails && <DefaultButton text="Update Account Details" onTouch={test} containerStyle={styles.updateButton}/>}
            <DefaultButton text="Logout" onTouch={logout} containerStyle={styles.logoutButton}/>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: 250,
        height: 50,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: `${COLORS.primary}20`,
    },
    logoutButton: {
        marginTop: 40,
        width: 250,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 50,
    },
    header: {
        marginBottom: 30,
        fontSize: 25,
        fontWeight: 600,
    },
    updateButton: {
        width: 250,
    },
    message: {
        marginTop: 10,
        marginBottom: 20,
        width: 250,
        textAlign: 'center',
    },
    success: {
        color: '#34ff61'
    },
    error: {
        color: 'red'
    },
})

export default AccountInfo;
