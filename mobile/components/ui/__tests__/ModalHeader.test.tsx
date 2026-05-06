import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ModalHeader } from '@/components/ui/ModalHeader';
import { Home } from 'lucide-react-native';

describe('ModalHeader', () => {
  it('renders the title correctly', () => {
    const { getByText } = render(<ModalHeader title="Nueva Transacción" onClose={() => {}} />);
    expect(getByText('Nueva Transacción')).toBeTruthy();
  });

  it('calls onClose when close button is pressed', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(<ModalHeader title="Ajustes" onClose={onCloseMock} />);
    
    fireEvent.press(getByTestId('close-modal-button'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('renders Icon if provided', () => {
    const { UNSAFE_getByType } = render(
      <ModalHeader title="Header" onClose={() => {}} Icon={Home} />
    );
    // Home is a lucide-react-native icon component
    expect(UNSAFE_getByType(Home)).toBeTruthy();
  });
});
