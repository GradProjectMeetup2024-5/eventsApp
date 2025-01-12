import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, TextInput} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    showPendingRequests,
    fetchFriendsList,
} from '../../../API/action/friend'; // Adjust the path as necessary

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
        <View>
            <Text>Send Friend Request:</Text>
            <TextInput
                placeholder="Enter Receiver ID"
                value={receiverId}
                onChangeText={setReceiverId}
            />
            <Button title="Send Request" onPress={handleSendRequest} />

            <Text>Pending Requests:</Text>
            {
                pendingRequests?.map((request) => (
                    <View key={request.id}>
                        <Text>{request.name}</Text>
                        <Button title="Accept" onPress={() => handleAcceptRequest(request.id)} />
                        <Button title="Reject" onPress={() => handleRejectRequest(request.id)} />
                    </View>
                ))
            }

            <Text>Friends List:</Text>
                {
                    friendsList?.map((friend) => (
                        <Text key={friend.id}>{friend.name}</Text>
                    ))
                }
        </View>
    );
};

export default Friends;
