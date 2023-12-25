
"use client";

import { useRef } from "react";
import { postEntry } from "../../pages/api/action";
import { useFormStatus } from "react-dom";

const Form = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        await postEntry(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
      className="relative flex flex-col items-start mb-5"
      style={{ opacity: pending ? 0.7 : 1 }}
    >
      <input
        type="text"
        placeholder="Your name"
        name="username"
        required
        disabled={pending}
        className="pl-4 pr-2 py-2 mt-1 mb-2 focus:ring-teal-500 focus:border-teal-500 block w-full border-neutral-300 rounded bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 my-input"
      />
      <textarea
        placeholder="Your feedback..."
        name="entry"
        required
        disabled={pending}
        className="pl-4 pr-2 py-2 mt-1 mb-2 focus:ring-teal-500 focus:border-teal-500 block w-full border-neutral-300 rounded bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 my-input"
      />
      <button
        type="submit"
        disabled={pending}
        className="flex items-center justify-center mt-2 font-medium h-10 bg-teal-500 text-neutral-900 dark:text-neutral-100 rounded w-full"
      >
        Post Feedback
      </button>
    </form>
  );
};

export default Form;
