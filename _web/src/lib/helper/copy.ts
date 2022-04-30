const copyClip = (text: string) => {
  return navigator.clipboard.writeText(text);
};

export { copyClip };
