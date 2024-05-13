import { Route, Routes } from "react-router-dom";

import { HomeScreen, CreateScreen, UpdateScreen } from "./screens";

function App() {
  return (
    <Routes>
      <Route path="/" Component={HomeScreen} />
      <Route path="/create" Component={CreateScreen} />
      <Route path="/update/:id" Component={UpdateScreen} />
    </Routes>
  );
}

export default App;
