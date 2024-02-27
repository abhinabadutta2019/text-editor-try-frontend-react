import React from "react";
import { useLocation } from "react-router-dom";
import {
  WhatsappIcon,
  WhatsappShareButton,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { FaCopy } from "react-icons/fa";

const ShareButton = ({ handleCopyToClipboard, copied }) => {
  const location = useLocation();
  const url = window.location.href; // Get the current URL

  return (
    <div>
      <h3>Share:</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Share via WhatsApp */}
        <WhatsappShareButton
          url={url}
          title="Check out this document"
          separator=":: "
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        {/* Share on Twitter */}
        <TwitterShareButton url={url} title="Check out this document">
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </div>
      {/* Copy to Clipboard */}
      {/* <div style={{ marginTop: "10px" }}>
        <button className="copy-url-btn" onClick={handleCopyToClipboard}>
          <FaCopy />
        </button>
        {copied && <p className="confirmation-message">URL Copied!</p>}
      </div> */}
      <div style={{ marginTop: "10px" }}>
        <button className="copy-url-btn" onClick={handleCopyToClipboard}>
          Copy to Clipboard
        </button>
        {copied && <p className="confirmation-message">URL Copied!</p>}
      </div>
    </div>
  );
};

export default ShareButton;
