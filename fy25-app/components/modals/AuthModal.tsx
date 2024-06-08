import { useState } from 'react';
import { TextInput, Modal, View, Text, TouchableOpacity } from 'react-native';
import { validateEmail } from '@/utils/index'
import RestApiClient from '@/utils/rest_api_client';
import LocalService from '@/services/local_service';

export function AuthModal({ authModal, setAuthModal }: { authModal: boolean; setAuthModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const handleLogIn = async () => {
        if (!validateEmail(email)) {
            return
        }
        if (password.length === 0) {
            alert("No puede iniciar sesion sin proveer su contraseña")
            return
        }
        const res = await RestApiClient.post("http://localhost:3000/api/login", {
            email,
            password
        })
        const localService = new LocalService();
        localService.setTokens(res.data);
        setAuthModal(!authModal);
    }
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const isDisabled = () => password.length === 0 || email.length === 0
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={authModal}
            onRequestClose={() => {
                setAuthModal(!authModal);
            }}
        >
            <View
                style={{ backgroundColor: 'rgba(0,0,0,0.8)', width: "100%", height: "100%", position: "absolute", flex: 1, justifyContent: 'center' }}
            >
                <View style={{ backgroundColor: 'rgb(200,200,200)', justifyContent: 'space-between' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 20, padding: 20 }}>
                        Autentique su cuenta para continuar
                    </Text>
                    <View>
                        <Text style={{ alignSelf: 'flex-start', marginLeft: 50, fontSize: 20 }}>Correo:</Text>
                        <TextInput
                            value={email}
                            onChangeText={txt => setEmail(txt)}
                            style={{ fontSize: 20, borderWidth: 2, borderColor: 'black', width: '80%', alignSelf: 'center', marginVertical: 5, borderRadius: 20, padding: 10, paddingLeft: 20 }}
                        />
                        <Text style={{ alignSelf: 'flex-start', marginLeft: 50, fontSize: 20 }}>Contraseña:</Text>
                        <TextInput
                            value={password}
                            onChangeText={txt => setPassword(txt)}
                            secureTextEntry={true}
                            style={{ fontSize: 20, borderWidth: 2, borderColor: 'black', width: '80%', alignSelf: 'center', marginVertical: 5, borderRadius: 20, padding: 10, paddingLeft: 20 }}
                        />
                    </View>
                    <TouchableOpacity disabled={isDisabled()} onPress={handleLogIn} style={{ backgroundColor: isDisabled() ? "rgba(112, 183, 126, 0.3)" : '#70b77e', width: "50%", alignSelf: 'center', borderRadius: 20, marginVertical: 20 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 20, padding: 20, color: isDisabled() ? "gray" : "black" }}>
                            Iniciar sesión
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}