import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

describe('PrimaryButton', () => {
  it('renders the label correctly', () => {
    const { getByText } = render(<PrimaryButton label="Submit" onPress={() => {}} />);
    expect(getByText('Submit')).toBeTruthy();
  });

  it('calls onPress when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<PrimaryButton label="Save" onPress={onPressMock} />);
    
    fireEvent.press(getByText('Save'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress if disabled is true', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<PrimaryButton label="Wait" onPress={onPressMock} disabled={true} />);
    
    // In React Native Testing Library, passing disabled=true to a Pressable prevents interaction events
    fireEvent.press(getByText('Wait'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('shows ActivityIndicator when loading is true and hides text', () => {
    const onPressMock = jest.fn();
    const { queryByText, UNSAFE_getByType } = render(
      <PrimaryButton label="Loading..." onPress={onPressMock} loading={true} />
    );
    
    // The text should not be rendered
    expect(queryByText('Loading...')).toBeNull();
    
    // ActivityIndicator should be rendered
    expect(UNSAFE_getByType(require('react-native').ActivityIndicator)).toBeTruthy();
    
    // And it shouldn't be clickable
    fireEvent.press(UNSAFE_getByType(require('react-native').ActivityIndicator).parent!);
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
