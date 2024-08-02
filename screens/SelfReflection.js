// SelfReflection.js

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { AccurateSelfAssessment, OtherCentred, Perspective, WillingnessToLearn } from '../contents/index';
import { SelfReflectionStyles, HalfButtonStyles, Default } from '../styles/index.style';
import { DefaultButton } from '../components/index';
import { useFocusEffect } from '@react-navigation/native';

const pages = [
  'AccurateSelfAssessment',
  'OtherCentred',
  'Perspective',
  'WillingnessToLearn'
];

const SelfReflection = ({ route, navigation }) => {
  const { initialPage, reset } = route.params || {};
  const [responses, setResponses] = useState({
    AccurateSelfAssessment: { value: 0, comment: '' },
    OtherCentred: { value: 0, comment: '' },
    Perspective: { value: 0, comment: '' },
    WillingnessToLearn: { value: 0, comment: '' },
  });

  const [visited, setVisited] = useState({
    AccurateSelfAssessment: false,
    OtherCentred: false,
    Perspective: false,
    WillingnessToLearn: false
  });

  const [currentPage, setCurrentPage] = useState(initialPage || 'AccurateSelfAssessment');

  // Ensure that the currentPage is updated when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      if (reset) {
        setResponses({
          AccurateSelfAssessment: { value: 0, comment: '' },
          OtherCentred: { value: 0, comment: '' },
          Perspective: { value: 0, comment: '' },
          WillingnessToLearn: { value: 0, comment: '' },
        });
        setVisited({
          AccurateSelfAssessment: false,
          OtherCentred: false,
          Perspective: false,
          WillingnessToLearn: false
        });
        setCurrentPage('AccurateSelfAssessment');
      } else if (initialPage) {
        setCurrentPage(initialPage);
      }
    }, [initialPage, reset])
  );

  useEffect(() => {
    setVisited(prev => ({ ...prev, [currentPage]: true }));
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
    const remainingPages = pages.filter(page => !visited[page]);
    return remainingPages.length === 0;
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
      console.log(responses); // or perform save action here
      navigation.navigate('Home');
    } else {
      const nextPage = pages.find(page => !visited[page]);
      if (nextPage) {
        setCurrentPage(nextPage);
      }
    }
  };

  return (
    <View style={Default.container}>
      {renderPageContent(currentPage)}
      <View style={SelfReflectionStyles.navigation}>
        <DefaultButton
          containerStyle={[HalfButtonStyles.container, { marginRight: 20 }]}
          text="Back"
          onTouch={() => navigation.goBack()}
        />
        <DefaultButton
          containerStyle={HalfButtonStyles.container}
          text={isLastPage() ? "Save" : "Next"}
          onTouch={handleNext}
        />
      </View>
    </View>
  );
};

export default SelfReflection;
