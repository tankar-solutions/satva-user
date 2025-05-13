import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiLock, FiMail } from "react-icons/fi";

// Internal imports
import Layout from "@layout/Layout";
import Error from "@components/form/Error";
import useLoginSubmit from "@hooks/useLoginSubmit";
import InputArea from "@components/form/InputArea";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit();

  useEffect(() => {
    // Check if authToken exists in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      router.replace("/user/dashboard");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) return null;

  return (
    <Layout title="Login" description="This is the login page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-4 flex flex-col lg:flex-row w-full">
          <div className="w-full sm:p-5 lg:p-8">
            <div className="mx-auto rounded-md w-full max-w-lg px-4 py-8 sm:p-10 bg-white shadow-xl">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">Login</h2>
                <p className="text-sm text-gray-500 mt-2 mb-8">
                  Login with your email and password
                </p>
              </div>
              <form
                onSubmit={handleSubmit((data) => submitHandler(data))}
                className="flex flex-col"
              >
                <div className="grid gap-5">
                  <InputArea
                    register={register}
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    Icon={FiMail}
                  />
                  <Error errorName={errors.email} />

                  <InputArea
                    register={register}
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    Icon={FiLock}
                  />
                  <Error errorName={errors.password} />

                  {loading ? (
                    <button
                      disabled
                      className="w-full py-3 rounded bg-emerald-500 text-white cursor-not-allowed"
                    >
                      Processing...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600"
                    >
                      Login
                    </button>
                  )}
                </div>
              </form>
              <div className="mt-4 text-sm text-center">
                <Link href="/auth/forget-password" className="text-emerald-500">
                  Forgot password?
                </Link>
              </div>
              <div className="mt-4 text-sm text-center">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-emerald-500">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
