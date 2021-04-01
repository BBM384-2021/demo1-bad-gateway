import React from 'react';
import { Button } from 'antd';
import { Alert } from 'antd';
function App() {

  return (
    <div>
      <Button type="text">Click Me</Button>
      <Alert message="Success Text" type="success" />
    </div>
  );
}

export default App;
