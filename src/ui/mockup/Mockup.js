"use client"
import Lottie from "lottie-react";
import animationData from "./Designer.json";
import animationDate from "./developer.json";

export default function Mockup() {
  return <Lottie animationData={animationData} loop={true} />;
}
export function DevMockup() {
  return <Lottie animationData={animationDate} loop={true} />;
}
