import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';

// Firebase Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD3S0TqEarMVGUJDeaUnMtsb-9Lk5c6zxY',
  authDomain: 'default-61e7d.firebaseapp.com',
  projectId: 'default-61e7d',
  storageBucket: 'default-61e7d.firebasestorage.app',
  messagingSenderId: '253571042741',
  appId: '1:253571042741:web:0b7e9e653e26cc13f2ddfc',
  measurementId: 'G-C6E9P5372W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Определяем интерфейс для звонка
interface Call {
  offer?: {
    type: string;
    sdp: string;
  };
  answer?: {
    type: string;
    sdp: string;
  };
}

// Компонент Webinar
export const Webinar: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [callId, setCallId] = useState<string | null>(null);
  const [inputCallId, setInputCallId] = useState<string>('');

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const webcamVideoRef = useRef<HTMLVideoElement | null>(null);

  const servers = {
    iceServers: [{ urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }],
    iceCandidatePoolSize: 10,
  };

  // Setup webcam stream and WebRTC connection
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (webcamVideoRef.current) {
          webcamVideoRef.current.srcObject = stream;
        }

        pcRef.current = new RTCPeerConnection(servers);

        // Add tracks to peer connection
        stream.getTracks().forEach((track) => {
          pcRef.current?.addTrack(track, stream);
        });

        // Setup ICE candidates handling
        pcRef.current.onicecandidate = async (event) => {
          if (event.candidate) {
            const callDocRef = doc(firestore, 'calls', callId!);
            const offerCandidatesCol = collection(callDocRef, 'offerCandidates');
            const offerCandidateDocRef = doc(offerCandidatesCol); // Создает новый документ с авто-генерируемым ID
            await setDoc(offerCandidateDocRef, event.candidate.toJSON());
          }
        };

        // Handle remote stream
        pcRef.current.ontrack = (event) => {
          const remoteStream = new MediaStream();
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
          });
          setRemoteStreams((prev) => [...prev, remoteStream]);
        };
      } catch (error) {
        console.error('Ошибка доступа к медиа устройствам:', error);
      }
    };

    startWebcam();

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      pcRef.current?.close();
    };
  }, [callId]);

  const startCall = async () => {
    if (!pcRef.current) return;

    const callDocRef = doc(collection(firestore, 'calls')); // Создаем новый документ
    const offerCandidatesCol = collection(callDocRef, 'offerCandidates');
    const answerCandidatesCol = collection(callDocRef, 'answerCandidates');
    setCallId(callDocRef.id); // Сохраняем ID звонка

    // Get candidates for caller, save to Firestore
    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        const offerCandidateDocRef = doc(offerCandidatesCol); // Создает новый документ с авто-генерируемым ID
        setDoc(offerCandidateDocRef, event.candidate.toJSON());
      }
    };

    // Create offer
    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);

    await setDoc(callDocRef, { offer: { type: offer.type, sdp: offer.sdp } });

    // Listen for remote answer
    onSnapshot(callDocRef, (snapshot) => {
      const data = snapshot.data() as Call; // Привязываем тип Call
      if (data?.answer) {
				// @ts-ignore
        const answerDescription = new RTCSessionDescription(data.answer);
        pcRef.current?.setRemoteDescription(answerDescription);
      }
    });

    // Listen for ICE candidates from the answerer
    onSnapshot(answerCandidatesCol, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pcRef.current?.addIceCandidate(candidate);
        }
      });
    });
  };

  const joinCall = async () => {
    if (!inputCallId || !pcRef.current) return;

    const callDocRef = doc(firestore, 'calls', inputCallId);
    const answerCandidatesCol = collection(callDocRef, 'answerCandidates');
    const offerCandidatesCol = collection(callDocRef, 'offerCandidates');

    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        const answerCandidateDocRef = doc(answerCandidatesCol); // Создает новый документ с авто-генерируемым ID
        setDoc(answerCandidateDocRef, event.candidate.toJSON());
      }
    };

    const callDataSnapshot = await getDoc(callDocRef);

    if (callDataSnapshot.exists()) {
      const callData = callDataSnapshot.data() as Call; // Привязываем тип Call

      if (callData?.offer) {
				// @ts-ignore
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(callData.offer));

        // Create an answer to the call
        const answer = await pcRef.current.createAnswer();
        await pcRef.current.setLocalDescription(answer);

        await setDoc(callDocRef, { answer: { type: answer.type, sdp: answer.sdp } });

        // Listen for ICE candidates from the caller
        onSnapshot(offerCandidatesCol, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const candidate = new RTCIceCandidate(change.doc.data());
              pcRef.current?.addIceCandidate(candidate);
            }
          });
        });
      }
    } else {
      console.error('Звонок не найден');
    }
  };

  return (
    <div>
      <h1>Video Chat</h1>
      <div>
        <input
          type="text"
          value={inputCallId}
          onChange={(e) => setInputCallId(e.target.value)}
          placeholder="Введите ID звонка"
        />
        <button onClick={joinCall}>Присоединиться к звонку</button>
      </div>
      <div>
        <button onClick={startCall} disabled={!!callId}>
          Начать звонок
        </button>
      </div>
      <div>
        <video ref={webcamVideoRef} autoPlay muted />
        {remoteStreams.map((stream, index) => (
					// @ts-ignore
          <video key={index} autoPlay muted={false} srcObject={stream} />
        ))}
      </div>
    </div>
  );
};
