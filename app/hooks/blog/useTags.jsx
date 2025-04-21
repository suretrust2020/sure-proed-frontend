import { useState } from "react";

export default function useTags() {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const addTag = (tag) => {
    if (!tag || tag.trim().length === 0) return;
    setTags((tags) => [...tags, tag]);
    setTag("");
  };

  const removeTag = (tag) => {
    const filteredTags = tags.filter((t) => t !== tag);
    setTags(filteredTags);
  };

  const handleChangeTag = (e) => {
    setTag(e.target.value);
  };
  return {
    tag,
    handleChangeTag,
    tags,
    addTag,
    removeTag,
  };
}
