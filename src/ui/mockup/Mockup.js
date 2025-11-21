"use client"
import Lottie from "lottie-react";
import animationData from "./Designer.json";
import animationDate from "./developer.json";
import animationDataLanding from "./landing.json"
import animationDataDigital from "./digital.json"

export default function Mockup() {
  return <Lottie animationData={animationData} loop={true} />;
}
export function DevMockup() {
  return <Lottie animationData={animationDate} loop={true} />;
}
export function LandingMockup() {
  return <Lottie animationData={animationDataLanding} loop={true} />;
}
export function DigitalMockup() {
  return <Lottie animationData={animationDataDigital} loop={true} />;
}