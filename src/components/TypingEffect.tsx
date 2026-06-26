import { useState, useEffect } from 'react';

interface TypingEffectProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  holdTime?: number;
}

export default function TypingEffect({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  holdTime = 1400,
}: TypingEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const activeWord = words[currentWordIndex];

    if (!isDeleting) {
      if (currentText !== activeWord) {
        timer = setTimeout(() => {
          setCurrentText(activeWord.substring(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, holdTime);
      }
    } else {
      if (currentText !== '') {
        timer = setTimeout(() => {
          setCurrentText(activeWord.substring(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, holdTime]);

  return (
    <span className="inline-flex items-center">
      <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent font-bold">
        {currentText}
      </span>
      <span className="text-emerald-500 font-light animate-[pulse_1s_infinite] ml-1">|</span>
    </span>
  );
}
