import { useColorScheme } from "@mui/material";
import ModeNightIcon from '@mui/icons-material/ModeNight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function App() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  return (
    <div
      className="flex w-[150px] justify-between mt-5 p-[10px] bg-cover bg-center rounded-full"
      style={{
        backgroundImage: mode === 'dark' ? 'url(/images/darkmode.jpg)' : 'none',
      }}
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
    >
      <div
        style={{
          backgroundColor: 'yellow',
          width: '30px',
          height: '30px',
          borderRadius: '50px',
        }}
      />
      <div>
        {mode === 'dark' ? (
          <ModeNightIcon style={{ width: '30px', height: '30px' }} />
        ) : (
          <WbSunnyIcon style={{ width: '30px', height: '30px' }} />
        )}
      </div>
    </div>
  );
}

export default App;
