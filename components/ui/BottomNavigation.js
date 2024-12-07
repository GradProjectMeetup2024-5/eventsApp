import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Tree, GamepadTwo, Briefcase, Heart, Basketball } from 'lucide-react-native';

const NavItem = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
        {icon}
        <Text style={styles.navLabel}>{label}</Text>
    </TouchableOpacity>
);

NavItem.propTypes = {
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default function BottomNavigation() {
    return (
        <View style={styles.container}>
            <NavItem
                icon={<Text style={{ color: '#808080' }}>🌳</Text>} // Temporary icon
                label="Travel"
                onPress={() => { }}
            />
            <NavItem
                icon={<Text style={{ color: '#808080' }}>🎮</Text>} // Temporary icon
                label="Hobbies"
                onPress={() => { }}
            />
            <NavItem
                icon={<Text style={{ color: '#808080' }}>💼</Text>} // Temporary icon
                label="Business"
                onPress={() => { }}
            />
            <NavItem
                icon={<Text style={{ color: '#808080' }}>❤️</Text>} // Temporary icon
                label="Support"
                onPress={() => { }}
            />
            <NavItem
                icon={<Text style={{ color: '#808080' }}>🏀</Text>} // Temporary icon
                label="Sport"
                onPress={() => { }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navLabel: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
    },
});