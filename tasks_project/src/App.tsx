// Style CSS
import './App.css'

// Shadcn components
import { Button } from '@/components/ui/button'

const App = () => {

  return (
    <div className="app flex flex-col justify-center items-center hover:underline">
      Hello World!
      <Button onClick={() => alert('Hello World!')}>Click me</Button>
    </div>
  );
}

export default App;
