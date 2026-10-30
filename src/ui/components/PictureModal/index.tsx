import { theme } from '@ui/styles/theme';
import { CameraView } from 'expo-camera';
import { CameraIcon, CheckIcon, Trash2Icon, XIcon } from 'lucide-react-native';
import { Image, Modal, StatusBar, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '../AppText';
import { Button } from '../Button';
import { CreateMealLoader } from '../CreateMealLoader';
import { styles } from './styles';
import { usePictureModalController } from './usePictureModalController';

interface IPictureModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate?: () => void;
}

export function PictureModal({ visible, onClose, onCreate }: IPictureModalProps) {
  const {
    isLoading,
    permission,
    pictureUri,
    cameraRef,
    requestPermission,
    handleTakePicture,
    handleTryAgain,
    handleConfirm,
  } = usePictureModalController({ onClose, onCreate });

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      statusBarTranslucent
      animationType="slide"
    >
      <StatusBar barStyle="light-content" animated />

      {isLoading && <CreateMealLoader type="picture" />}

      {!isLoading && permission && (
        <View style={styles.container}>
          <SafeAreaProvider>
            <SafeAreaView style={styles.content}>
              <View style={styles.header}>
                <Button variant="neutral" size="icon" rippleStyle="light" onPress={onClose}>
                  <XIcon color={theme.colors.gray[500]} size={20} />
                </Button>
              </View>

              {!permission.granted && (
                <View style={styles.body}>
                  <View style={styles.permissionContainer}>
                    <CameraIcon color={theme.colors.gray[500]} size={32} />

                    <AppText
                      color={theme.colors.gray[500]}
                      align="center"
                      style={styles.permissionLabel}
                    >
                      Para registrar sua refeição com uma foto, precisamos de acesso à câmera do seu
                      dispositivo.
                    </AppText>
                  </View>

                  <Button onPress={requestPermission}>Conceder acesso</Button>
                </View>
              )}

              {permission.granted && (
                <>
                  <View style={styles.body}>
                    {!pictureUri && (
                      <CameraView ref={cameraRef} style={styles.camera} facing="back" />
                    )}

                    {pictureUri && <Image source={{ uri: pictureUri }} style={styles.picture} />}
                  </View>

                  <View style={styles.footer}>
                    <View style={styles.actionsContainer}>
                      {!pictureUri && (
                        <>
                          <Button
                            size="icon"
                            variant="neutral"
                            rippleStyle="light"
                            onPress={handleTakePicture}
                          >
                            <CameraIcon size={20} color={theme.colors.lime[600]} />
                          </Button>

                          <AppText color={theme.colors.gray[500]} align="center">
                            Tirar foto
                          </AppText>
                        </>
                      )}

                      {pictureUri && (
                        <View style={styles.actionsGroup}>
                          <Button
                            size="icon"
                            variant="neutral"
                            rippleStyle="light"
                            onPress={handleTryAgain}
                          >
                            <Trash2Icon size={20} color={theme.colors.gray[500]} />
                          </Button>

                          <Button size="icon" onPress={handleConfirm}>
                            <CheckIcon size={20} color={theme.colors.black[700]} />
                          </Button>
                        </View>
                      )}
                    </View>
                  </View>
                </>
              )}
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      )}
    </Modal>
  );
}
