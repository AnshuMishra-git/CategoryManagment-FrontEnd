import './App.css';
import Header from './Components/Header';
import Category from './Components/Category'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SubCategory from './Components/SubCategory';
import ChildSubCategory from './Components/ChildSubCategory';
import NotFound from './Components/NotFound';
import AddeditListing from './Components/Common/add-edit-listins';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Category />} />
        <Route exact path="/subCategory" element={<SubCategory />} />
        <Route exact path="/childSubCategory" element={<ChildSubCategory />} />
        <Route exact path="/add-edit" element={<AddeditListing />} />
        <Route exact path="/add-edit/?:name" element={<AddeditListing />} />
        <Route exact path="/add-edit/?:id" element={<AddeditListing />} />
        {/* <Route exact path="/add-edit/?:id?:name" element={<AddeditListing />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
