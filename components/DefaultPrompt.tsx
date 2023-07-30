"use client";

import PromptCopy from "./PromptCopy";
import { motion } from "framer-motion";

type DefaultPromptProps = {
  post: { prompt: string; tag: string };
};

const DefaultPrompt = ({ post }: DefaultPromptProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
  };
  return (
    <motion.div className="prompt_card" whileHover={{ scale: 1.03 }}>
      <p className="mb-4 text-lg">{post.prompt}</p>
      <div className="flex flex-between">
        <p className="font-inter orange_gradient cursor-pointer button-hover">
          #{post.tag}
        </p>
        <PromptCopy onCopy={handleCopy} />
      </div>
    </motion.div>
  );
};

export default DefaultPrompt;
