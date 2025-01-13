import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    showPendingRequests,
    fetchFriendsList,
    showProfile,
} from '../../../API/action/friend';

const Friends = () => {
    const dispatch = useDispatch();
    const [receiverId, setReceiverId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [viewAll, setViewAll] = useState(false);

    const pendingRequests = useSelector((state) => state.friemdReducer.pendingRequests || []);
    const friendsList = useSelector((state) => state.friemdReducer.friendsList || []);
    const showProfiles = useSelector((state) => state.friemdReducer.profile || []);

    useEffect(() => {
        dispatch(showPendingRequests());
        dispatch(fetchFriendsList());
        dispatch(showProfile());
    }, [dispatch]);

    useEffect(() => {
        if (viewAll) {
            const results = showProfiles.filter((profile) =>
                profile.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProfiles(results);
        }
    }, [searchQuery, showProfiles, viewAll]);

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

    const handleViewAll = () => {
        setViewAll(true);
        setFilteredProfiles(showProfiles);
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
            {pendingRequests.map((item) => (
                <View style={styles.requestItem} key={item?.id}>
                    <Text style={styles.requestText}>{item?.sender?.name}</Text>
                    <View style={styles.requestActions}>
                        <TouchableOpacity
                            style={styles.acceptButton}
                            onPress={() => handleAcceptRequest(item?.id)}
                        >
                            <Text style={styles.acceptButtonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.rejectButton}
                            onPress={() => handleRejectRequest(item?.id)}
                        >
                            <Text style={styles.rejectButtonText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            <Text style={styles.heading}>Friends List</Text>
            {friendsList.map((item) => (
                <View key={item.id}>
                    <Text style={styles.friendItem}>{item.name}</Text>
                </View>
            ))}

            <Text style={styles.heading}>Search and View All Profiles</Text>
            {viewAll && (
                <TextInput
                    style={styles.input}
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            )}
            <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAll}>
                <Text style={styles.viewAllButtonText}>View All</Text>
            </TouchableOpacity>

            {viewAll && (
                filteredProfiles.map((item) => (
                    <View style={styles.profileItem} key={item.id}>
                        <Text style={styles.profileText}>{item.name}</Text>
                        <Text style={styles.profileSubText}>{item.email}</Text>
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={() => dispatch(sendFriendRequest(item.id))}
                        >
                            <Text style={styles.sendButtonText}>Send Request</Text>
                        </TouchableOpacity>
                    </View>
                ))
            )}
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
        marginTop: 10,
    },
    acceptButton: {
        backgroundColor: '#22C55E',
        padding: 10,
        borderRadius: 8,
        marginRight: 10,
    },
    acceptButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    rejectButton: {
        backgroundColor: '#EF4444',
        padding: 10,
        borderRadius: 8,
    },
    rejectButtonText: {
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
    },
    viewAllButton: {
        backgroundColor: '#6B7280',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    viewAllButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
    profileItem: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
    profileText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
    },
    profileSubText: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 10,
    },
});
