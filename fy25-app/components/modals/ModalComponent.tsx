import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';

import Modal, { ModalProps } from 'react-native-modal';
import ButtonComponent from '../buttons/ButtonComponent';

interface Props {
    hideModal: () => void;
    style?: StyleProp<ViewStyle>;
}

const ModalComponent = ({
    hideModal,
    style,
    children,
    ...props
}: Props & Partial<ModalProps>) => {
    return (
        <Modal {...props}>
            <View style={[styles.modal, style]}>
                <ButtonComponent
                    title="Close"
                    style={styles.closeButton}
                    onClick={hideModal}
                />
                {children}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 30,
        height: 30,
    },
    modal: {
        flex: 3 / 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius: 30,
    }
});

export default ModalComponent;