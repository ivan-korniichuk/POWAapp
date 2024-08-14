import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert } from 'react-native';
import { AccurateSelfAssessment, OtherCentred, Perspective, WillingnessToLearn } from '../contents/index';
import { SelfReflectionStyles, HalfButtonStyles, Default } from '../styles/index.style';
import { DefaultButton } from '../components/index';
import { useFocusEffect } from '@react-navigation/native';
import { useData } from '../storage/storageService';
import { DataSyncManager } from '../storage/dataService';

const pages = [
  'AccurateSelfAssessment',
  'OtherCentred',
  'Perspective',
  'WillingnessToLearn'
];

const SelfReflection = ({ route, navigation }) => {
  const { lastReport } = useData();
  const { addReport, updateExistingReport } = DataSyncManager();
  const { initialPage, reset } = route.params || {};

  const [isNewReport, setIsNewReport] = useState(true);
  const [responses, setResponses] = useState({
    AccurateSelfAssessment: { value: 0, comment: '' },
    OtherCentred: { value: 0, comment: '' },
    Perspective: { value: 0, comment: '' },
    WillingnessToLearn: { value: 0, comment: '' },
  });

  const initialVisitedState = {
    AccurateSelfAssessment: false,
    OtherCentred: false,
    Perspective: false,
    WillingnessToLearn: false,
  };

  const [visited, setVisited] = useState(initialVisitedState);
  const [visitedBackup, setVisitedBackup] = useState(initialVisitedState);

  const [currentPage, setCurrentPage] = useState(initialPage || 'AccurateSelfAssessment');
  const [history, setHistory] = useState([initialPage || 'AccurateSelfAssessment']);

  useFocusEffect(
    useCallback(() => {
      if (reset) {
        setIsNewReport(true);
        setVisitedBackup(visited);
        setResponses({
          AccurateSelfAssessment: { value: 0, comment: '' },
          OtherCentred: { value: 0, comment: '' },
          Perspective: { value: 0, comment: '' },
          WillingnessToLearn: { value: 0, comment: '' },
        });
        setVisited({
          AccurateSelfAssessment: true, // Set first page to visited
          OtherCentred: false,
          Perspective: false,
          WillingnessToLearn: false
        });
        setCurrentPage('AccurateSelfAssessment');
        setHistory(['AccurateSelfAssessment']);
      } else {
        // setIsNewReport(false);
        setResponses({
          AccurateSelfAssessment: { value: lastReport.self_assess, comment: lastReport.comment_self_assess },
          OtherCentred: { value: lastReport.other_centred, comment: lastReport.comment_other_centred },
          Perspective: { value: lastReport.perspective, comment: lastReport.comment_perspective },
          WillingnessToLearn: { value: lastReport.willing_learn, comment: lastReport.comment_willing_learn },
        });
        setCurrentPage(initialPage || 'AccurateSelfAssessment');
        setHistory([initialPage || 'AccurateSelfAssessment']);
        // setVisited({
        //   AccurateSelfAssessment: true,
        //   OtherCentred: true,
        //   Perspective: true,
        //   WillingnessToLearn: true,
        // });
      }
    }, [initialPage, reset, lastReport])
  );

  useEffect(() => {
    if (currentPage) {
      setVisited(prev => ({ ...prev, [currentPage]: true }));
      setHistory(prev => [...prev.filter(page => page !== currentPage), currentPage]);
    }
  }, [currentPage]);

  const handleResponseChange = (key, field, value) => {
    setResponses(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const isLastPage = () => {
    // console.log(visited)
    return pages.every(page => visited[page]);
  };

  const renderPageContent = (page) => {
    switch (page) {
      case 'AccurateSelfAssessment':
        return (
          <AccurateSelfAssessment
            response={responses.AccurateSelfAssessment}
            handleResponseChange={(field, value) => handleResponseChange('AccurateSelfAssessment', field, value)}
          />
        );
      case 'OtherCentred':
        return (
          <OtherCentred
            response={responses.OtherCentred}
            handleResponseChange={(field, value) => handleResponseChange('OtherCentred', field, value)}
          />
        );
      case 'Perspective':
        return (
          <Perspective
            response={responses.Perspective}
            handleResponseChange={(field, value) => handleResponseChange('Perspective', field, value)}
          />
        );
      case 'WillingnessToLearn':
        return (
          <WillingnessToLearn
            response={responses.WillingnessToLearn}
            handleResponseChange={(field, value) => handleResponseChange('WillingnessToLearn', field, value)}
          />
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (isLastPage()) {
      if (isNewReport) {
        console.log('next add')
        addReport(responses);
        setIsNewReport(false);
      } else {
        updateExistingReport(responses);
        console.log('next update')
      }
      setHistory([]);
      navigation.navigate('Home');
    } else {
      const nextPage = pages.find((page) => !visited[page]);
      if (nextPage) {
        setCurrentPage(nextPage);
      } else {
        console.log('No next page found');
      }
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      const prevPage = history[history.length - 2];
      setHistory(prev => prev.slice(0, -1));
      setCurrentPage(prevPage);
    } else {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you really want to leave without saving your report?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('User chose to stay'),
          },
          {
            text: 'Leave',
            onPress: () => {
              console.log('User chose to leave');
              if (isNewReport) {
                setVisited(visitedBackup);
              }
              setIsNewReport(false);
              setHistory([]);
              navigation.navigate('Home');
            }
          }
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={Default.container}>
      {renderPageContent(currentPage)}
      <View style={SelfReflectionStyles.navigation}>
        <DefaultButton
          containerStyle={[HalfButtonStyles.container, { marginRight: 20 }]}
          text="Back"
          onTouch={handleBack}
        />
        <DefaultButton
          containerStyle={HalfButtonStyles.container}
          text={isLastPage() ? isNewReport ? 'Save' : 'Update' : 'Next'}
          onTouch={handleNext}
        />
      </View>
    </View>
  );
};

export default SelfReflection;