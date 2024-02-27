import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";
import ShareButton from "./components/ShareButton";
import Footer from "./shared/Footer";

const TextDocument = () => {
  const { id: roomId } = useParams();
  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);
  const { authenticated } = useAuth();
  const [copied, setCopied] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const socketIo = io(`${process.env.REACT_APP_API_URL}`);

    socketIo.emit("joinRoom", {
      roomId,
      userId: localStorage.getItem("userId"),
    });

    socketIo.on("updateText", (data) => {
      setText(data);
    });

    socketIo.on("documentNotFound", () => {
      setNotFound(true);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [roomId]);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    socket.emit("textChange", {
      roomId,
      newText,
      userId: localStorage.getItem("userId"),
    });
  };

  const handleCopyToClipboard = () => {
    const currentURL = window.location.href;

    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  if (notFound) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <div className="container mt-1">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h4 className="document-title text-center mb-4">Scribble Text</h4>
            <ShareButton
              handleCopyToClipboard={handleCopyToClipboard}
              copied={copied}
            />
            <textarea
              className="form-control mt-4"
              value={text}
              onChange={handleTextChange}
              disabled={!authenticated}
              style={{
                width: "100%",
                height: "60vh", // Set height to 60% of viewport height
                backgroundColor: "#f8f9fa", // Set off-white background color
                border: "1px solid #ced4da", // Add border to match Bootstrap input styling
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TextDocument;
