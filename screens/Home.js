import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Platform } from 'react-native';
import { DefaultButton, ProgressCard } from '../components/index';
import { useData } from '../storage/storageService';
import { Audio, Video, ResizeMode, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

const videoPOWA = require('../assets/ThePowaModel.mp4');

const Home = ({ navigation }) => {
  const video = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { lastReport } = useData();

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

  const startNewQuestionnaire = () => {
    navigation.navigate('SelfReflection', { reset: true });
  };

  const navigateToQuestionnaire = (page) => {
    navigation.navigate('SelfReflection', { initialPage: page });
  };

  const formatDate = (newDate) => {
    if (!newDate) {
      return '';
    }
    const date = new Date(newDate);
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    return formatter.format(date).replace(',', '');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        {lastReport.dateCreatedCli === '' ? (
          <View>
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
          </View>
        ) : (
          <View>
            <Text style={styles.dateText}>Report Date: {formatDate(lastReport.dateCreatedCli)}</Text>
            <View style={styles.reflectionSection}>
              <ProgressCard
                title="Perspective"
                leftLabel="Blinkered"
                rightLabel="Unfocused"
                value={lastReport.perspective}
                onPress={() => navigateToQuestionnaire('Perspective')}
                containerStyle={styles.progressCard}
              />
              <ProgressCard
                title="Other-Centred"
                leftLabel="Self-serving"
                rightLabel="Servile"
                value={lastReport.other_centred}
                onPress={() => navigateToQuestionnaire('OtherCentred')}
                containerStyle={styles.progressCard}
              />
              <ProgressCard
                title="Willingness to Learn"
                leftLabel="Closed-minded"
                rightLabel="Scatterbrain"
                value={lastReport.willing_learn}
                onPress={() => navigateToQuestionnaire('WillingnessToLearn')}
                containerStyle={styles.progressCard}
              />
              <ProgressCard
                title="Accurate Self-Assessment"
                leftLabel="Self Denigration"
                rightLabel="Arrogant"
                value={lastReport.self_assess}
                onPress={() => navigateToQuestionnaire('AccurateSelfAssessment')}
                containerStyle={styles.progressCard}
              />
            </View>
          </View>
        )}
        <DefaultButton 
          icon={<Image source={require('../assets/icon1.png')} style={styles.icon} />}
          text='Add New Report'
          onTouch={startNewQuestionnaire}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <View style={styles.actionButtonsSection}>
          <DefaultButton 
            icon={<Image source={require('../assets/icon2.png')} style={styles.icon} />}
            text='Track My Progress'
            onTouch={() => navigation.navigate('Graph')}
            containerStyle={styles.actionButton}
          />
          <DefaultButton 
            icon={<Image source={require('../assets/icon3.png')} style={styles.icon} />}
            text='My Statistics'
            onTouch={() => navigation.navigate('BarChart')}
            containerStyle={styles.actionButton}
          />
          <DefaultButton 
            icon={<Image source={require('../assets/icon5.png')} style={styles.icon} />}
            text='Calendar'
            onTouch={() => navigation.navigate('Calendar')}
            containerStyle={styles.actionButton}
          />
          <DefaultButton 
            icon={<Image source={require('../assets/icon4.png')} style={styles.icon} />}
            text='Help'
            onTouch={() => navigation.navigate('Help')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  box: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reflectionSection: {
    marginBottom: 10,
  },
  progressCard: {
    height: 50,
    marginBottom: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  video: {
    width: '100%',
    height: 'auto',
    aspectRatio: 16 / 9,
    backgroundColor: 'black',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  addButton: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  actionButtonsSection: {
    marginTop: 10,
  },
  actionButton: {
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
