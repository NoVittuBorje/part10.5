import { render, screen, fireEvent, waitFor, userEvent, within} from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn';


describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn()
      const user = userEvent.setup()
      const mockdata = {
        username:"juu",
        password:"jaa"
      }
      render(<SignInContainer onSubmit={onSubmit("juu")}/>)
      screen.debug();
      await user.type(screen.getByPlaceholderText("Username"),"juu")
      await user.type(screen.getByPlaceholderText("Password"),"jaa")

      screen.debug()
      await user.press(screen.getByTestId("button"))
      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(screen.getByPlaceholderText("Username").props.value).toBe("juu")
        expect(screen.getByPlaceholderText("Password").props.value).toBe("jaa")
        expect(onSubmit).toHaveBeenCalledWith(screen.getByPlaceholderText("Username").props.value)
        
      });
    });
  });
});