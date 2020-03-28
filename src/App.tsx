import React from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  RouteComponentProps,
  Switch,
  useParams
} from 'react-router-dom';
import About from './About';
import './App.css';
import Home from './Home';
import {
  useObservableCallback,
  useObservablePropsCallback
} from 'observable-hooks';
import { map } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Albums } from './itunesMusic';
import { SuggestedInput } from './Suggest';
interface matchProps {
  id: string;
}
interface Props extends RouteComponentProps<matchProps> {}

// const Portfolio = (props: Props) => {
//   const { match } = props;

//   let { id } = match.params;

//   return (
//     <div>
//       Portfolio component
//       <p>Url params: {id}</p>
//     </div>
//   );
// };

const Portfolio = () => {
  let { id } = useParams();

  return (
    <div>
      Portfolio component
      <p>Url params: {id}</p>
    </div>
  );
};
const NavBar = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About Us</Link>
      </li>
      <li>
        <Link to="/portfolio/asdf">Portfolio</Link>
      </li>
      <li>
        <Link to="/album">Album</Link>
      </li>
      <li>
        <Link to="/suggest">TypeAhead</Link>
      </li>
    </ul>
  </div>
);
function App() {
  // const [onChange, textChange$] = useObservableCallback(event$ =>
  //   event$.pipe(
  //     map(event => {
  //       return {
  //         text: event.currentTarget.value,
  //         flag: us
  //       };
  //     })
  //   )
  // );
  return (
    <main>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/portfolio/:id" component={Portfolio} />
          <Route path="/album" component={Albums} />
          <Route path="/suggest" component={SuggestedInput} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
