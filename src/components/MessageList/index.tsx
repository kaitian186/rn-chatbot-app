import React, { useRef } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MessageObject, UserType } from '../../types';

interface MessageListProps {
  contents: MessageObject[],
}

export const MessageList: React.FC<MessageListProps> = (props) => {
  const contentRef = useRef<ScrollView>(null);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      ref={contentRef}
      onContentSizeChange={() => {
        contentRef.current?.scrollTo({ animated: true });
      }}
      scrollEnabled={true}
      style={styles.messageListContainer}
    >
      <KeyboardAvoidingView
        behavior="position"
        enabled
        style={styles.fluid}
        keyboardVerticalOffset={230}
      >
        <View style={styles.messageListWrap}>
          {props.contents.map((content) => (
            content.sender === UserType.BOT ?
             <BotMessage key={content.key} text={content.context}/> :
             <UserMessage key={content.key} text={content.context} />
          ))}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

interface UserMessageProps {
  key: number,
  text: string,
}

const UserMessage: React.FC<UserMessageProps> = ({key, text}) => (
  <View key={key} style={styles.userStyle}>
    <Icon name="user" size={30} color="green" style={styles.userIcon} />
    <View style={styles.userMessage}>
      <Text style={styles.userContent}>{text}
      </Text>
    </View>
  </View>
)

const BotMessage: React.FC<UserMessageProps> = ({key, text}) => (
  <View key={key} style={styles.botStyle}>
    <Icon name="user" size={30} color="#900" style={styles.botIcon} />
    <View style={styles.botMessage}>
      <Text style={styles.botContent}>{text}
      </Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  messageListContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    height: '100%',
  },
  messageListWrap: {
    flexGrow: 1,
    paddingTop: 20,
    marginBottom: 10,
  },
  botStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  botMessage: {
    padding: 10,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    backgroundColor: "#FFF",
  },
  userStyle: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  userMessage: {
    padding: 10,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    backgroundColor: "rgb(145, 186, 214)",
  },
  botContent: {
    maxWidth: 270,
    fontSize: 16,
  },
  userContent: {
    maxWidth: 270,
    fontSize: 16,
    color: '#FFF',
  },
  fluid: {
    flex: 1
  },
  botIcon: {
    marginRight: 10,
  },
  userIcon: {
    marginLeft: 10,
  }
});