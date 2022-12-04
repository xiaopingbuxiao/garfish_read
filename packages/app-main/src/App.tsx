import './assets/App.css';
import { LayoutMain } from './components/layout/index'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<LayoutMain></LayoutMain>}>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
