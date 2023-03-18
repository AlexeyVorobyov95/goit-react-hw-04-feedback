import { useState } from 'react';
import { Container } from './App.styled';
import { Statistics } from 'components/Statistics/Statistics';
import { Section } from '../Section/Section';
import { FeedbackOptions } from '../FeedbackOptions/FeedbackOptions';
import { Notification } from 'components/Notification/Notification';
import { GlobalStyles } from 'components/GlobalStyles';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  const onLeaveFeedback = e => {
    switch (e.target.textContent) {
      case `good`:
        setGood(good + 1);
        break;
      case `neutral`:
        setNeutral(neutral + 1);
        break;
      case `bad`:
        setBad(bad + 1);
        break;
      default:
        return;
    }
  };

  const totalFeedback = good + neutral + bad;
  const positiveFeedbackPercentage = () => {
    if (!good) {
      return 0;
    }
    return Math.round((good * 100) / totalFeedback);
  }

  return (
    <>
      <GlobalStyles />
      <Container>
        <Section title={'Please leave feedback'}>
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={onLeaveFeedback}
          />
        </Section>
        {totalFeedback > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Container>
    </>
  );
}