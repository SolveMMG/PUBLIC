import { BrowserRouter, Routes , Route} from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./components/HomePage";
import LikedPhotos from "./components/LikedPhotos";
import SignUp from "./components/SignUp";
import PostPhoto from "./components/PostPhoto";
import Posted from "./components/Posted";
import LogIn from "./components/LogIn";
import PhotoInformation from "./components/PhotoInformation";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='liked_photos' element={<LikedPhotos/>}/>
        <Route path='post_photo' element={<PostPhoto/>}/>
        <Route path='sign_up' element={<SignUp/>}/>
        <Route path="log_in" element={<LogIn/>}/>
        <Route path="posted" element={<Posted/>}/>
        <Route path="photo/:photoId" element={<PhotoInformation/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
