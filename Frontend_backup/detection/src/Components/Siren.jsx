import React, { useState } from 'react';

function PlaySoundUsingWebAudio() {
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine'; // Wave type: sine, square, triangle, sawtooth
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Frequency of A4 note (440 Hz)
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Volume level

    oscillator.start();
    setIsPlaying(true);

    // Stop sound after 1 second
    setTimeout(() => {
      oscillator.stop();
      setIsPlaying(false);
    }, 1000);
  };

  return (
    <div>
      <button onClick={playSound} disabled={isPlaying}>
        {isPlaying ? 'Playing Sound...' : 'Play Sound (Web Audio)'}
      </button>
    </div>
  );
}

export default PlaySoundUsingWebAudio;