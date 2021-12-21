import logo from './logo.svg';
import './App.css';
import { Container, Typography } from '@mui/material';
import Main from './components/Main'

function App() {
  return (
    <Container maxWidth="lg">
      <Typography
        gutterBottom
        variant="h2"
        align ="center">
           Pharmacy
        </Typography>
      <Main />
    </Container>
  );
}

export default App;
