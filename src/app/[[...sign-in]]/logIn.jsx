import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useTransition, animated } from "@react-spring/web";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const LogIn = ({ isForgot, setIsForgot }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState("");

  const { isLoaded, signIn, setActive } = useSignIn();

  const transition = useTransition(isForgot, {
    initial: {
      x: 0,
      opacity: 1,
    },
    from: { x: -400, opacity: 0 },
    enter: { x: 0, opacity: 1, delay: 150 },
    leave: { x: -400, opacity: 0 },
    config: {
      duration: 200,
    },
  });

  async function logIn(e) {
    e.preventDefault();
    setProgress("");
    if (email === "") {
      setProgress("blankEmail");
    } else {
      // var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // Check the sign in response to
      // decide what to do next.
      await signIn
        .create({
          identifier: email,
          password,
        })
        .then(async (result) => {
          if (result.status === "complete") {
            setActive({ session: result.createdSessionId });
            searchParams.get("redirect_url")
              ? router.push(searchParams.get("redirect_url"))
              : router.push("/admin");
          }
        })
        .catch((err) => {
          if (email === "") setProgress("blankEmail");
          else setProgress(err.errors[0].message);
        });
    }
  }

  return (
    <>
      {transition((style, item) => {
        return !item ? (
          <animated.div
            style={style}
            className="flex flex-col rounded-[35px] p-[20px] gap-[20px] shadow-[#00000059_0px_5px_15px] border-solid border-bordercl"
          >
            <h2 style={{ color: "black", textAlign: "center" }}>Đăng nhập</h2>
            <form
              className="flex flex-col gap-[20px] p-[20px] [&>div]:w-[280px] [&>div]:gap-[5px] [&>div]:flex [&>div]:justify-center"
              onSubmit={logIn}
            >
              <div className="flex-col">
                {/* <label>Email hoặc mã sinh viên</label> */}
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full input border-solid border-bordercl text-black"
                  placeholder="Email"
                />
                {progress === "blankEmail" ? (
                  <p style={{ color: "red", fontSize: "14px" }}>
                    Vui lòng nhập mã người dùng!
                  </p>
                ) : progress === "Couldn't find your account." ? (
                  <p style={{ color: "red", fontSize: "14px" }}>
                    Mã người dùng không tồn tại!
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div>
                {/* <label htmlFor="password">Mật khẩu</label> */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full input border-solid border-bordercl text-black "
                  placeholder="Mật khẩu"
                />
                {progress === "Enter password." && email !== "" ? (
                  <p style={{ color: "red", fontSize: "14px" }}>
                    Vui lòng nhập mật khẩu!
                  </p>
                ) : progress ===
                  "Password is incorrect. Try again, or use another method." ? (
                  <p style={{ color: "red", fontSize: "14px" }}>
                    Mật khẩu không chính xác!
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div>
                {!isLoaded ? (
                  <span className="loading loading-spinner loading-sm bg-primary"></span>
                ) : (
                  <button className="btn btn-primary text-white">
                    Đăng nhập
                  </button>
                )}
              </div>
            </form>

            {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
              {!isLoaded ? (
                <button className="disabled cursor-not-allowed text-bordercl text-[14px]">
                  Quên mật khẩu
                </button>
              ) : (
                <button
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0",
                    color: "#069",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                  onClick={() => setIsForgot((pre) => !pre)}
                >
                  Quên mật khẩu
                </button>
              )}
            </div> */}
          </animated.div>
        ) : (
          <></>
        );
      })}
    </>
  );
};

export default LogIn;
