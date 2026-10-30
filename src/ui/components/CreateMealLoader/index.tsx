import { theme } from '@ui/styles/theme';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View } from 'react-native';

import { AppText } from '../AppText';
import { Logo } from '../Logo';
import video from './ai-animation.mp4';
import { styles } from './styles';

interface ICreateMealLoaderProps {
  type: 'audio' | 'picture';
}

export function CreateMealLoader({ type }: ICreateMealLoaderProps) {
  const player = useVideoPlayer(video, (player) => {
    player.play();
    player.loop = true;
    player.generateThumbnailsAsync(0);
  });

  return (
    <View style={styles.conatiner}>
      <VideoView player={player} nativeControls={false} style={styles.video} />

      <View style={styles.content}>
        <Logo height={24} width={75} />

        <AppText color={theme.colors.gray[300]} align="center">
          {type === 'audio' && 'Estou ouvindo o seu áudio...'}
          {type === 'picture' && 'Estou analisando a sua foto...'}
        </AppText>
      </View>
    </View>
  );
}
