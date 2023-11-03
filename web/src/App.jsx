import { useState } from 'react';

import './styles/App.css';
import './styles/reset.css';

import {makeRequest} from './api/api';
import {SideMenu} from './components/SideMenu';
import {ChatMessage} from './components/ChatMessage';

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message:"Como posso te ajudar hoje?"
  }]);

  async function handleSubmit(e) {
    e.preventDefault();

    let response = await makeRequest({prompt: input})

    response = response.data.split('\n')
    .map(line => <p>{line}</p>);

    setChatLog([...chatLog, {
      user: 'me', 
      message: `${input}`
    },{
      user: 'gpt', 
      message: response
    }]);
    setInput("");
  }

  return (
    <div className='app'>
      <SideMenu/>

      <section className='chatbox'>
        <div className='chat-log'>
          {chatLog.map((message, index)=>(
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        <div className='chat-input-holder'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              rows='1'
              className='chat-input-textarea'
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </form>
        </div>
      </section>
    </div>
  )
}

export default App;