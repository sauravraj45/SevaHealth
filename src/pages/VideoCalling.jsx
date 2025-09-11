import React, { useState, useRef, useEffect } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import { UserCheck } from "lucide-react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,

} from "react-icons/fa";

const socket = io("http://localhost:5001");

const VideoCall = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [name, setName] = useState("");
  const [otherUserName, setOtherUserName] = useState("");

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [remoteMicOn, setRemoteMicOn] = useState(true);
  const [remoteCameraOn, setRemoteCameraOn] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const selfCallRef = useRef({ callerPeer: null, receiverPeer: null });

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) myVideo.current.srcObject = currentStream;
      })
      .catch((err) => console.error(err));

    socket.on("me", (id) => setMe(id));
    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setOtherUserName(data.name);
      setCallerSignal(data.signal);
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      connectionRef.current.signal(signal);
    });
    socket.on("remoteCameraToggled", ({ cameraState }) =>
      setRemoteCameraOn(cameraState)
    );
    socket.on("remoteMicToggled", ({ micState }) => setRemoteMicOn(micState));
    socket.on("callEnded", () => endCallCleanup());

    return () => {
      socket.off("me");
      socket.off("callUser");
      socket.off("callAccepted");
      socket.off("remoteCameraToggled");
      socket.off("remoteMicToggled");
      socket.off("callEnded");
    };
  }, []);

  const callUser = (id) => {
    if (!stream) return alert("Media stream not available.");
    if (id === me) {
      const callerPeer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      });
      const receiverPeer = new Peer({ initiator: false, trickle: false });
      callerPeer.on("signal", (signal) => receiverPeer.signal(signal));
      receiverPeer.on("signal", (signal) => callerPeer.signal(signal));
      receiverPeer.on("stream", (s) => {
        if (userVideo.current) userVideo.current.srcObject = s;
      });
      callerPeer.on("connect", () => {
        setRemoteCameraOn(cameraOn);
        setRemoteMicOn(micOn);
      });
      connectionRef.current = callerPeer;
      selfCallRef.current = { callerPeer, receiverPeer };
      setCallAccepted(true);
      setOtherUserName("You");
      return;
    }

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) =>
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name || "Patient",
      })
    );
    peer.on("stream", (s) => {
      if (userVideo.current) userVideo.current.srcObject = s;
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    if (!stream) return alert("Media stream not available.");
    setCallAccepted(true);
    setReceivingCall(false);
    const peer = new Peer({ initiator: false, trickle: false, stream: stream });
    peer.on("signal", (data) =>
      socket.emit("answerCall", { signal: data, to: caller })
    );
    peer.on("stream", (s) => {
      if (userVideo.current) userVideo.current.srcObject = s;
    });
    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const endCallCleanup = () => {
    setCallEnded(true);
    setReceivingCall(false);
    setCallAccepted(false);
    setCaller("");
    setCallerSignal(null);
    connectionRef.current?.destroy();
    if (selfCallRef.current.callerPeer) selfCallRef.current.callerPeer.destroy();
    if (selfCallRef.current.receiverPeer)
      selfCallRef.current.receiverPeer.destroy();
    selfCallRef.current = { callerPeer: null, receiverPeer: null };
  };

  const leaveCall = () => {
    const otherUser = caller || idToCall;
    if (otherUser && otherUser !== me) socket.emit("endCall", { to: otherUser });
    endCallCleanup();
  };

  const toggleMic = () => {
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    if (!audioTrack) return;
    const newMicState = !micOn;
    audioTrack.enabled = newMicState;
    setMicOn(newMicState);
    if (idToCall === me && selfCallRef.current.receiverPeer)
      setRemoteMicOn(newMicState);
    else if (connectionRef.current?.connected && idToCall !== me)
      socket.emit("toggleMic", { to: idToCall, micState: newMicState });
  };

  const toggleCamera = () => {
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    if (!videoTrack) return;
    const newCameraState = !cameraOn;
    videoTrack.enabled = newCameraState;
    setCameraOn(newCameraState);
    if (idToCall === me && selfCallRef.current.receiverPeer)
      setRemoteCameraOn(newCameraState);
    else if (connectionRef.current?.connected && idToCall !== me)
      socket.emit("toggleCamera", { to: idToCall, cameraState: newCameraState });
  };

  const ControlsOverlay = ({ mic, toggleMicFn, cam, toggleCamFn, endCall }) => (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 bg-gray-200 bg-opacity-50 rounded-full p-2 transition-opacity duration-300 opacity-80 hover:opacity-100">
      <button
        onClick={toggleMicFn}
        className={`p-3 rounded-full text-white ${
          mic ? "bg-gray-600" : "bg-red-500"
        }`}
      >
        {mic ? <FaMicrophone /> : <FaMicrophoneSlash />}
      </button>
      <button
        onClick={toggleCamFn}
        className={`p-3 rounded-full text-white ${
          cam ? "bg-gray-600" : "bg-red-500"
        }`}
      >
        {cam ? <FaVideo /> : <FaVideoSlash />}
      </button>
      {callAccepted && (
        <button
          onClick={endCall}
          className="p-3 rounded-full bg-red-600 text-white"
        >
          <FaPhoneSlash />
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-br flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
   
   <div className="text-center mb-5">
  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-4">
    <UserCheck className="w-4 h-4" />
    Video Consultation
  </div>
  <h2 className="text-3xl font-medium mb-2">Video Calling with Doctor</h2>
  <p className="text-lg text-gray-600">
    Connect with doctors instantly for expert advice, medical consultation, and personalized care
  </p>
</div>

      {/* Video Section - now limited to max-w-md */}
      <div className="relative flex flex-col md:flex-row gap-6 sm:gap-8 mb-6 sm:mb-8 w-full max-w-md items-center">
        {stream && (
          <div className="relative rounded-lg overflow-hidden shadow-2xl border-2 border-blue-500 w-full">
            <video
              ref={myVideo}
              autoPlay
              playsInline
              muted
              className={`w-full h-[200px] sm:h-[250px] object-cover ${
                cameraOn ? "" : "hidden"
              }`}
            />
            {!cameraOn && (
              <div className="w-full h-[200px] sm:h-[250px] flex items-center justify-center bg-gray-700">
                <FaVideoSlash className="text-gray-500 text-5xl sm:text-6xl" />
              </div>
            )}
            <h2 className="absolute top-2 left-2 bg-white bg-opacity-50 px-2 py-1 rounded text-xs sm:text-sm">
              Patient
            </h2>
            <ControlsOverlay
              mic={micOn}
              toggleMicFn={toggleMic}
              cam={cameraOn}
              toggleCamFn={toggleCamera}
              endCall={leaveCall}
            />
          </div>
        )}

        {callAccepted && !callEnded && (
          <div className="relative rounded-lg overflow-hidden shadow-2xl border-2 border-green-500 w-full">
            <video
              ref={userVideo}
              autoPlay
              playsInline
              className={`w-full h-[200px] sm:h-[250px] object-cover ${
                remoteCameraOn ? "" : "hidden"
              }`}
            />
            {!remoteCameraOn && (
              <div className="w-full h-[200px] sm:h-[250px] flex items-center justify-center bg-gray-700">
                <FaVideoSlash className="text-gray-500 text-5xl sm:text-6xl" />
              </div>
            )}
            <h2 className="absolute top-2 left-2 bg-white bg-opacity-50 px-2 py-1 rounded text-xs sm:text-sm">
              {otherUserName || "Doctor"}
            </h2>
            <ControlsOverlay
              mic={remoteMicOn}
              toggleMicFn={() => setRemoteMicOn(!remoteMicOn)}
              cam={remoteCameraOn}
              toggleCamFn={() => setRemoteCameraOn(!remoteCameraOn)}
              endCall={leaveCall}
            />
          </div>
        )}
      </div>

      {/* Form Section */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md bg-gray-200 p-4 sm:p-5 rounded-lg">
        <p className=" text-sm sm:text-lg text-center">
          Your Consultation ID:{" "}
          <span
            className="font-mono font-bold text-blue-700  break-all"
            onClick={() => navigator.clipboard.writeText(me)}
          >
            {me}
          </span>
        </p>
        <input
          type="text"
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <div className="flex flex-col sm:flex-row w-full gap-2">
          <input
            type="text"
            placeholder="Doctor's Consultation ID"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            className="flex-1 p-2 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          {!callAccepted && (
            <button
              onClick={() => callUser(idToCall)}
              className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-700 text-sm sm:text-base"
              disabled={!idToCall}
            >
              Start Consultation
            </button>
          )}
        </div>

        {receivingCall && !callAccepted && (
          <div className="mt-4 p-3 sm:p-4 border border-green-500 bg-green-900 bg-opacity-50 rounded-lg text-center animate-pulse w-full">
            <h3 className="mb-2 font-semibold text-sm sm:text-base">
              {otherUserName || "Doctor"} is ready to consult...
            </h3>
            <button
              onClick={answerCall}
              className="px-4 sm:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm sm:text-base"
            >
              Join Consultation
            </button>
          </div>
        )}

        {callEnded && (
          <p className="text-red-500 mt-4 text-sm sm:text-base">
            Consultation has ended.
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
