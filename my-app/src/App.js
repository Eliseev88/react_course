import { Message } from "./Components/Message/Message";

function App() {
  const userName = 'John';
  const message = 'Good day'
  return (
  <div>
    <h1 style={{color: 'green', fontSize: '100px'}}>Hello World</h1>
    <Message name = {userName} message = {message} />
  </div>
  )
}

export default App;
