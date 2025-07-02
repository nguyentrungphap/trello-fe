import { Container } from "@mui/material";
import Board from "./pages/Boards/_id";

function App() {

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Board />
    </Container>
  );
}

export default App;