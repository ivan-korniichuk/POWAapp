import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { DefaultButton } from '../components/index';
import { ArrowLeft } from 'react-native-feather';
import { Default, HelpStyles, ScrollViewStyles } from '../styles/index.style';

const videoPOWA = require('../assets/ThePowaModel.mp4');

const Help = ({ navigation }) => {
  const video = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const setupAudioMode = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
          interruptionModeIOS: InterruptionModeIOS.DuckOthers,
          playsInSilentModeIOS: true,
          playThroughEarpieceAndroid: false,
          shouldDuckAndroid: true,
          staysActiveInBackground: false,
        });

        if (video.current) {
          await video.current.setStatusAsync({
            volume: 0.5,
          });
        }
      } catch (error) {
        console.error('Error setting up audio mode:', error);
      }
    };

    setupAudioMode();
  }, []);

  const handlePlaybackStatusUpdate = (status) => {
    setIsPlaying(status.isPlaying);
  };

  useEffect(() => {
    handlePlayPause();
  }, [isPlaying]);

  const handlePlayPause = async () => {
    if (video.current) {
      if (isPlaying) {
        await video.current.playAsync();
      }
    }
  };

  const handleButtonPress = () => {
    console.log('Button pressed');
  };


  return (
    <View style={Default.container}>
      <ScrollView contentContainerStyle={ScrollViewStyles.scrollViewContent} style={ScrollViewStyles.scrollView}>
      
      <Text style={HelpStyles.subTitle}>
        Introduction:
      </Text>
      
      <Text style={HelpStyles.info}>
        This video explains the POWA model for person-centered coaching:
      </Text>

      <Video
              ref={video}
              source={videoPOWA}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls={true}
              shouldPlay={false}
              style={styles.video}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
              onReadyForDisplay={videoData => {
                if (Platform.OS === 'web') {
                  videoData.srcElement.style.position = "initial";
                }
              }}
            />
      
      <TouchableOpacity style={HelpStyles.vidButton} onPress={handleButtonPress}>
          <Text style={HelpStyles.vidButtonText}>More Videos</Text>
        </TouchableOpacity>
      
      <Text style={HelpStyles.info}>
        POWA Diagram:
      </Text>
      
      <Text style={HelpStyles.info}>
      </Text>
      <Text style={HelpStyles.subTitle}>
        Tips:
      </Text>
      
      <Text style={HelpStyles.info}>
        Advice from Paul
      </Text>
      
      <Text style={HelpStyles.info}>
      </Text>
      <Text style={HelpStyles.subTitle}>
        Using the App:
      </Text>

        <Text style={HelpStyles.info}>
        To rate your performance open the Self-Reflection page and navigate through the features of the POWA model using the arrow buttons.
      </Text>

      <Text style={HelpStyles.info}>
        On each page, there is a prompt question to help you to reflect on why you have rated youreself the way you have, and whether the rating is accurate. You can select a response to the question for advice on how to adjust your rating. It is also possible to disable prompt questions in the app settings.
      </Text>
      
      <Text style={HelpStyles.info}>
        Your self-reflection will correspond to the sliders on the home page; if you believe that you are deficient in a particular attribute, the scale will be towards the "-" end of the scale, while "+" denotes excess.
      </Text>

      <Text style={HelpStyles.info}>
        You can view your progress in different attributes on a graph over various time periods in the "My Progress" page.
      </Text>

      <Text style={HelpStyles.info}>
        The "My Statistics" page shows a bar chart of your average deficiency or excess in each POWA feature.
      </Text>
      
      <Text style={HelpStyles.info}>
      </Text>
      <Text style={HelpStyles.subTitle}>
        Permissions:
      </Text>
      
      <Text style={HelpStyles.info}>
        Data in this app is collected for research purposes. By using this app, you are contributing to research into the use of the POWA model to encourage person-centered coaching.                                     - Thank you!
      </Text>


      </ScrollView>
      <DefaultButton text='Back' icon={<ArrowLeft color='#ffffff'/>} onTouch={() => navigation.navigate('Home')}/>
    </View>
  );
};

export default Help;