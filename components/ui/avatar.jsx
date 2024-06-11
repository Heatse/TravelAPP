import React, { useState } from 'react';
import { View, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';

const Avatar = ({ imageBase64, style }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAvatarPress = () => {
    setModalVisible(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleAvatarPress}>
        <View style={[styles.container, style]}>
          <Image
            source={{uri: imageBase64}}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Image
              source={{uri: imageBase64}}
              style={styles.modalImage}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.primary, 
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default Avatar;
