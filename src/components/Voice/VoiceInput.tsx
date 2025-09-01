import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceInputProps {
  isListening: boolean;
  onToggleListening: (listening: boolean) => void;
  onTranscript: (text: string) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  isListening,
  onToggleListening,
  onTranscript,
}) => {
  const [isSupported, setIsSupported] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    // Check if Web Speech API is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          onTranscript(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        onToggleListening(false);
      };

      recognitionRef.current.onend = () => {
        onToggleListening(false);
        stopAudioVisualization();
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      stopAudioVisualization();
    };
  }, [onToggleListening, onTranscript]);

  const startAudioVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      microphoneRef.current.connect(analyserRef.current);
      
      const updateAudioLevel = () => {
        if (analyserRef.current && isListening) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average / 255);
          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };
      
      updateAudioLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopAudioVisualization = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setAudioLevel(0);
  };

  const handleToggleListening = () => {
    if (!isSupported) return;

    if (isListening) {
      recognitionRef.current?.stop();
      stopAudioVisualization();
    } else {
      recognitionRef.current?.start();
      startAudioVisualization();
    }
    onToggleListening(!isListening);
  };

  if (!isSupported) {
    return (
      <div className="relative">
        <button
          disabled
          className="p-3 rounded-lg bg-muted/20 text-foreground-secondary cursor-not-allowed"
          title="Speech recognition not supported"
        >
          <MicOff size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggleListening}
        className={`relative p-3 rounded-lg transition-all duration-300 ${
          isListening
            ? 'btn-neon-secondary animate-pulse-neon'
            : 'btn-neon-primary hover:shadow-primary-glow'
        }`}
        title={isListening ? 'Stop recording' : 'Start voice input'}
      >
        {isListening ? <Mic size={20} /> : <Mic size={20} />}
        
        {/* Audio Level Visualization */}
        {isListening && (
          <div className="absolute inset-0 rounded-lg pointer-events-none">
            <div
              className="absolute inset-0 rounded-lg bg-secondary/20 transition-all duration-100"
              style={{
                transform: `scale(${1 + audioLevel * 0.3})`,
                opacity: audioLevel,
              }}
            />
          </div>
        )}
      </button>
      
      {/* Listening Indicator */}
      {isListening && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full animate-pulse-neon">
          <div className="absolute inset-0 rounded-full bg-secondary animate-ping" />
        </div>
      )}
    </div>
  );
};