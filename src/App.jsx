import { RouterProvider } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-datepicker/dist/react-datepicker.css';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import router from 'routes';

import themes from 'themes';

import NavigationScroll from 'layout/NavigationScroll';

const App = () => {
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes({})}>
        <CssBaseline />
        <NavigationScroll>
          <RouterProvider router={router} />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
