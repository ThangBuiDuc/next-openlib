"use client";
import { useState } from "react";
import LogIn from "./logIn";
import ForgotPass from "./forgotPass";

const Content = () => {
  const [isForgot, setIsForgot] = useState(false);

  return (
    <>
      <div className={`flex justify-center items-center w-screen h-screen`}>
        <LogIn isForgot={isForgot} setIsForgot={setIsForgot} />
        {/* <ForgotPass isForgot={isForgot} setIsForgot={setIsForgot} /> */}
      </div>
    </>
  );
};

export default Content;
