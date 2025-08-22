import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Components/Home";
import Dashboard from "../Components/Dashboard";
import Header from "../Components/Header";
import Help from "../Components/Help";
import Falldetection from "../Components/Falldetection";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/navbar" element={<Header/>}/>
      <Route path="/help" element={<Help/>}/>
      <Route path="/falldetection" element={<Falldetection/>}/>
      
    </Routes>
  );
};

export default Routers;