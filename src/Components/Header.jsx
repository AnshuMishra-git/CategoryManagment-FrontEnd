import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import React, {useState,useEffect} from 'react';
import { TabMenu } from "primereact/tabmenu";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';



function Header() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if(location.pathname == '/') setActiveIndex(0);
    if(location.pathname == '/subCategory') setActiveIndex(1);
    if(location.pathname == '/childSubCategory') setActiveIndex(2);
  }, [location.pathname])

  const items = [
    { label: "Category", icon: "pi pi-fw pi-home" },
    { label: "Sub Category", icon: "pi pi-fw pi-calendar" },
    { label: "Child Sub Category", icon: "pi pi-fw pi-pencil" },
  ];

  const onTabChanges = (e) =>{
    setActiveIndex(e.index);
    if(e.value.label =="Category") navigate('/');
    if(e.value.label =="Sub Category") navigate('/subCategory');
    if(e.value.label =="Child Sub Category") navigate('/childSubCategory');

  }
  return (
    <div className="card">
      <TabMenu model={items}  activeIndex={activeIndex} onTabChange={(e) => onTabChanges(e)} />
    </div>
  );
}
export default Header

