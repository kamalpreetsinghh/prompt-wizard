"use client";

import FormField from "../FormField";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Loader from "../Loader";
import { capitalizeWords, fetcher } from "@/lib/common";
import useSWR, { mutate } from "swr";
import ErrorBoundary from "../ErrorBoundary";

type ProfileFormProps = {
  userId: String;
};

const ProfileForm = ({ userId }: ProfileFormProps) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [submitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const {
    data: userProfile,
    error,
    isLoading,
  } = useSWR(`/api/user/${userId}`, fetcher);

  useEffect(() => {
    if (!isLoading) {
      setUsername(userProfile.username);
      setName(userProfile.name);
      if (userProfile.bio) {
        setBio(userProfile.bio);
      }
    }
  }, [userProfile, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          username,
          name: capitalizeWords(name),
          bio,
        }),
      });

      if (response.status === 409) {
        setUsernameError("Username already exists");
        return;
      }

      if (response.ok) {
        await fetch(`/api/validate?path=/profile/${userId}`);
        router.back();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (error) return <ErrorBoundary />;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <motion.section
          className="w-full max-w-full flex-center flex-col my-10 sm:my-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <h1 className="heading text-left">
            <span className="orange-gradient">Edit Profile</span>
          </h1>
          <form
            onSubmit={handleSubmit}
            className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
          >
            <FormField
              title="Username"
              state={username}
              placeholder="mountain_explorer"
              errorMessage={usernameError}
              isRequired
              setState={setUsername}
            />

            <FormField
              title="First and Last Name"
              state={name}
              placeholder="Bruce Wayne"
              isRequired
              autocapitalize
              setState={setName}
            />

            <FormField
              title="Bio"
              state={bio}
              placeholder="Hi, I'm a Software Engineer 👋"
              setState={setBio}
            />

            <div className="flex justify-end mx-3 mb-5 gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-button bg-red-800 w-24"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-button bg-primary w-24"
              >
                {submitting ? (
                  <div className="w-24 flex items-center justify-center">
                    <span className="loader bottom-2.5"></span>
                  </div>
                ) : (
                  "Edit"
                )}
              </button>
            </div>
          </form>
        </motion.section>
      )}
    </>
  );
};

export default ProfileForm;
