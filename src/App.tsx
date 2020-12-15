
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  KeyboardAvoidingView,
} from 'react-native';

import { Header, MessageList, MessageInputBox } from './components';
import { getQuestions } from "./api";
import { parseStep, isEmptyObject } from "./library/helper";
import { MessageObject, QuestionNormalize, UserType } from './types'

const App = () => {
  const [step, setStep] = useState(0);
  const [sender, setSender] = useState(UserType.BOT);
  const [message, setMessage] = useState('');
  const [questions, setQuestions] = useState<QuestionNormalize>({});
  const [messageList, setMessageList] = useState<MessageObject[]>([]);

  useEffect(() => {
    loadQuestions();
  }, [])

  useEffect(() => {
    if (!isEmptyObject(questions) && sender === UserType.BOT) {
      handleBotMessage();
    }
  }, [questions, sender])

  const loadQuestions = async () => {
    const questions = await getQuestions();

    setQuestions(questions);
  }

  const handleBotMessage = () => {
    let newMessage: MessageObject;
    const key = messageList.length;

    let nextStep = 1;
    if (step) {
      nextStep = parseStep(questions[step], message) as number;
    }

    if (!nextStep) {
      newMessage = {
        key,
        sender: UserType.BOT,
        context: "Message don't match with the validation, please input correct message"
      };
    } else {
      newMessage = {
        key,
        sender: UserType.BOT,
        context: questions[nextStep].question
      };
      setStep(nextStep);
    }
    setMessage('');
    setSender(UserType.USER);
    setMessageList([...messageList, newMessage]);
  }

  const handleUserMessage = () => {
    if (questions[step].paths) {
      const key = messageList.length;
      const newMessage = {
        key,
        sender: UserType.USER,
        context: message
      };
      setSender(UserType.BOT);
      setMessageList([...messageList, newMessage]);
    }
  }

  const handleSubmit = (): void => {
    handleUserMessage()
  }

  const handleMessageChange = (text: string): void => {
    setMessage(text);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={styles.container}
      >
        <SafeAreaView style={styles.fluid}>
          <Header />
          <MessageList
            contents={messageList}
          />
          <MessageInputBox
            onMessageChange={handleMessageChange}
            onSubmit={handleSubmit}
            message={message}
            secureText={(step && questions[step].style === 'password' ? true : false)}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0ff',
  },
  fluid: {
    flex: 1
  }
});

export default App;
