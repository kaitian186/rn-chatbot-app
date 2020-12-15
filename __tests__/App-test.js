/**
 * @format
 */

import 'react-native';
import React from 'react';
import { Header, MessageList, MessageInputBox } from '../src/components';

// Note: test renderer must be required after react-native.
import { render, fireEvent } from '@testing-library/react-native';

describe('when logged in', () => {
  it('Header renders correctly', () => {
    const { getByText } = render(<Header />);
    const header = getByText('Chat Bot App');
    expect(header).toBeTruthy();
  });

  it('MessageList renders correctly', () => {
    const messages = [
      { context: 'Do you live in California?', key: 0, sender: 'BOT' },
      { context: 'Yes', key: 1, sender: 'USER' },
      { context: 'Are you suffering from insomnia?', key: 2, sender: 'BOT' },
      { context: 'Yes', key: 3, sender: 'USER' },
      { context: "What's your email?", key: 4, sender: 'BOT' },
      { context: 'Test@a.com', key: 5, sender: 'USER' },
      {
        context:
          "What's your full name? (This information must match your photo ID.)",
        key: 6,
        sender: 'BOT',
      },
    ];

    const { getByText } = render(<MessageList contents={messages} />);
    expect(getByText('Test@a.com')).toBeTruthy();
    expect(getByText('Do you live in California?')).toBeTruthy();
  });
  it('MessageInputBox renders correctly', () => {
    let message;
    const secureText = true;
    const handleSubmitMock = jest.fn();
    const handleMessageChangeMock = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <MessageInputBox
        message={message}
        secureText={secureText}
        onSubmit={handleSubmitMock}
        onMessageChange={handleMessageChangeMock}
      />,
    );

    const inputBox = getByPlaceholderText('Type here ...');
    const sendButton = getByText('send');
    expect(inputBox).toBeTruthy();
    expect(sendButton).toBeTruthy();
    fireEvent(inputBox, 'onChangeText', 'yes');
    fireEvent(sendButton, 'onPress');
    expect(handleSubmitMock).toHaveBeenCalled();
    expect(handleMessageChangeMock).toHaveBeenCalled();
  });
});
