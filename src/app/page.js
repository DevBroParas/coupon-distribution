"use client";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState("");
  const [cooldownEndTime, setCooldownEndTime] = useState(null);

  useEffect(() => {
    const storedCooldownEndTime = localStorage.getItem("cooldownEndTime");
    if (storedCooldownEndTime) {
      setCooldownEndTime(parseInt(storedCooldownEndTime, 10));
    }
  }, []);

  useEffect(() => {
    if (cooldownEndTime) {
      localStorage.setItem("cooldownEndTime", cooldownEndTime);
    }
  }, [cooldownEndTime]);

  const claimCoupon = async () => {
    const res = await fetch("/api/claim");
    const data = await res.json();
    setMessage(data.message);
    if (data.code) {
      setCoupon(data.code);
      toast.success("Coupon claimed successfully!");
    }
    if (data.cooldownEndTime) setCooldownEndTime(data.cooldownEndTime);
  };

  const getRemainingTime = () => {
    const now = Date.now();
    return cooldownEndTime ? Math.max(0, cooldownEndTime - now) : 0;
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl">Round-Robin Coupon Distribution</h1>

      <button
        onClick={claimCoupon}
        className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
        disabled={getRemainingTime() > 0}
      >
        Claim Coupon
      </button>

      {message && <p className="mt-2">{message}</p>}
      {coupon && <p className="font-bold">Your Coupon: {coupon}</p>}
      {getRemainingTime() > 0 && (
        <p className="mt-2">
          Please wait: {formatTime(getRemainingTime())} before claiming again.
        </p>
      )}
      <ToastContainer />
    </div>
  );
};

export default Page;
