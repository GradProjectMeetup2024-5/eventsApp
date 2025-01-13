import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    showPendingRequests,
    fetchFriendsList,
} from '../../../API/action/friend'; // Adjust the path as necessary
import { Key } from 'lucide-react-native';

const Friends = () => {
    const dispatch = useDispatch();
    const [receiverId, setReceiverId] = useState(''); // ID of the user to send a request
    const pendingRequests = useSelector((state) => state.friemdReducer.pendingRequests || []);
    const friendsList = useSelector((state) => state.friemdReducer.friendsList || []);

    useEffect(() => {
        dispatch(showPendingRequests());
        dispatch(fetchFriendsList());
    }, [dispatch]);

    const handleSendRequest = () => {
        if (receiverId) {
            dispatch(sendFriendRequest(receiverId));
            setReceiverId(''); // Clear input after sending request
        } else {
            Alert.alert('Please enter a receiver ID');
        }
    };

    const handleAcceptRequest = (requestId) => {
        dispatch(acceptFriendRequest(requestId));
    };

    const handleRejectRequest = (requestId) => {
        dispatch(rejectFriendRequest(requestId));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Send Friend Request</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Receiver ID"
                    value={receiverId}
                    onChangeText={setReceiverId}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendRequest}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.heading}>Pending Requests</Text>
            {
                pendingRequests.map((item) => (
                    <View style={styles.requestItem} key={item?.id} >
                        <Text style={styles.requestText}>{item?.name}</Text>
                        <View style={styles.requestActions}>
                            <TouchableOpacity
                                style={styles.acceptButton}
                                onPress={() => handleAcceptRequest(item?.id)}
                            >
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.rejectButton}
                                onPress={() => handleRejectRequest(item?.id)}
                            >
                                <Text style={styles.buttonText}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            }

            <Text style={styles.heading}>Friends List</Text>
            {
                friendsList.map((item) => (
                   <View key={item.id}>
                    <Text style={styles.friendItem}>{item?.name}</Text>
                     </View>
                ))
            }
        </View>
    );
};

export default Friends;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F9FAFB',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#1F2937',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#2563EB',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    requestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    requestText: {
        fontSize: 16,
        color: '#374151',
    },
    requestActions: {
        flexDirection: 'row',
    },
    acceptButton: {
        backgroundColor: '#10B981',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginRight: 8,
    },
    rejectButton: {
        backgroundColor: '#EF4444',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    friendItem: {
        fontSize: 16,
        color: '#374151',
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
});
