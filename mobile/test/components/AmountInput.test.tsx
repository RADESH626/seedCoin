import { render, fireEvent } from '@testing-library/react-native';
import { AmountInput } from '@/src/modules/transactions/components/AmountInput';


describe('AmountInput', () => {
  it('debe renderizar el monto inicial correctamente', () => {
    const { getByDisplayValue } = render(
      <AmountInput amount="1000" onAmountChange={() => {}} isIncome={true} />
    );
    
    expect(getByDisplayValue('1000')).toBeTruthy();
  });

  it('debe llamar a onAmountChange cuando el texto cambia', () => {
    const onAmountChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <AmountInput amount="" onAmountChange={onAmountChangeMock} isIncome={false} />
    );
    
    const input = getByPlaceholderText('0');
    fireEvent.changeText(input, '500');
    
    expect(onAmountChangeMock).toHaveBeenCalledWith('500');
  });

  it('debe mostrar el símbolo de dólar con el color correcto para ingresos', () => {
    const { getByText } = render(
      <AmountInput amount="0" onAmountChange={() => {}} isIncome={true} />
    );
    
    const symbol = getByText('$');
    // Verificamos que tenga la clase de color para ingresos (seed-400)
    expect(symbol.props.className).toContain('text-seed-400');
  });
});
