import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { useSignIn } from "@clerk/nextjs";

const ForgotPass = ({ isForgot, setIsForgot }) => {
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState("");

  const transition = useTransition(isForgot, {
    from: { x: 400, opacity: 0 },
    enter: { x: 0, opacity: 1, delay: 150 },
    leave: { x: 400, opacity: 0 },
    config: {
      duration: 200,
    },
  });

  const { isLoaded, signIn } = useSignIn();

  async function forgotPassword(e) {
    e.preventDefault();
    // alert('clicked!')
    // Prepare sign in with strategy and identifier
    // console.log(email)
    if (email.includes("@hpu.edu.vn")) {
      await signIn
        .create({
          strategy: "email_link",
          identifier: email,
          redirectUrl: `${window.location.origin}/reset-password`,
        })
        .then((res) => {
          if (res.status === "needs_first_factor")
            setProgress("forGotPassSent");
        })
        .catch((err) => {
          setProgress(err.errors[0].message);
        });
    } else {
      setProgress("Couldn't find your account.");
    }
  }

  return (
    <>
      {transition((style, item) => {
        return item ? (
          <animated.div
            style={style}
            className={`fixed flex flex-col rounded-[35px] p-[20px] gap-[20px] shadow-[#00000059_0px_5px_15px] border-solid border-bordercl`}
          >
            <div>
              <button onClick={() => setIsForgot((pre) => !pre)}>
                <BiArrowBack style={{ fontSize: "35px" }} />
              </button>
            </div>
            <h2 className="text-center">Quên mật khẩu</h2>
            <form
              className="flex flex-col gap-[20px] p-[20px] [&>div]:w-[280px] [&>div]:gap-[5px] [&>div]:flex [&>div]:flex-col"
              onSubmit={forgotPassword}
            >
              <div>
                {/* <label>Email</label> */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full input  border-solid border-bordercl"
                  placeholder="Email"
                />
                {progress === "Couldn't find your account." ? (
                  <p style={{ color: "red", fontSize: "14px" }}>
                    Email không tồn tại trong hệ thống!
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex">
                {!isLoaded ? (
                  <span className="loading loading-spinner loading-lg bg-primary"></span>
                ) : progress === "forGotPassSent" ? (
                  <p style={{ color: "green", fontSize: "14px" }}>
                    Một đường link đặt lại mật khẩu đã được gửi đến Email!
                  </p>
                ) : (
                  <button className="btn btn-primary text-white w-fit self-center">
                    Xác nhận
                  </button>
                )}
              </div>
            </form>
          </animated.div>
        ) : (
          <></>
        );
      })}
    </>
  );
};

export default ForgotPass;
