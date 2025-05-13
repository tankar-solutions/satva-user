import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { notifyError, notifySuccess } from "@utils/toast";

const useLoginSubmit = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async ({ email, password }) => {
    setLoading(true);

    try {
      // Standard login using NextAuth
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        notifyError(result.error);
      } else {
        localStorage.setItem("authToken", "dummyAuthToken");
        router.push("/user/dashboard");
      }
    } catch (error) {
      notifyError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    errors,
    loading,
    handleSubmit,
    submitHandler,
  };
};

export default useLoginSubmit;
