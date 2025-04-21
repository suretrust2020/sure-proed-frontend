import { useRef, useState } from "react";

export default function usePoster() {
  const file = useRef();
  const [posterUri, setPosterUri] = useState();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64Poster = await toBase64(file);
    setPosterUri(base64Poster);
  };
  return {
    handleFileChange,
    posterUri,
  };
}
