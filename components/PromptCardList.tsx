import PromptCard from "./PromptCard";
import { Post } from "@/common.types";

type PromptCardListProps = {
  posts: Array<Post>;
  showUserActions?: boolean;
  showUserInfo?: boolean;
  handleTagClick?: (tag: string) => void;
};

const PromptCardList = ({
  posts,
  showUserActions,
  showUserInfo,
  handleTagClick,
}: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          showUserActions={showUserActions}
          showUserInfo={showUserInfo}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default PromptCardList;
