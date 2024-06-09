import React from 'react'
import ModalComponent from './ModalComponent'
import Spinner from "@/components/Loading";
import { Text } from 'react-native';

function ScanDoneModal({
    showModal,
    setShowModal,
    loading,
    userBalance
}: {
    showModal: boolean;
    setShowModal: (data: boolean) => void;
    loading: boolean;
    userBalance: string;
}) {
    return (
        <ModalComponent
            isVisible={showModal}
            onBackdropPress={() => setShowModal(false)}
            onBackButtonPress={() => setShowModal(false)}
            hideModal={() => setShowModal(false)}
            animationIn="fadeInDown"
            animationOut="fadeOutUp"
        >
            {loading ?
                <Spinner /> :
                <Text style={{ fontSize: 30, textAlign: 'justify', marginHorizontal: 20 }}>
                    Escanneo satisfactorio!
                    {"\n"}
                    {"\n"}
                    {"\n"}
                    Balance: {userBalance}</Text>
            }
        </ModalComponent>
    )
}

export default ScanDoneModal