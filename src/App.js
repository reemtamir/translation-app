//Styles

import './styles/mainStyles.scss';
import './styles/home.scss';

//Components
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => (
  <div className="main-container">
    <Home />

    <Footer />
  </div>
);

export default App;
