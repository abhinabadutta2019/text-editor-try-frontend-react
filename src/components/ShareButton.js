import React from "react";
import { useLocation } from "react-router-dom";
import {
  WhatsappIcon,
  WhatsappShareButton,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const ShareButton = () => {
  const location = useLocation();
  const url = window.location.href; // Get the current URL

  return (
    <div>
      <h3>Share this document:</h3>
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
  );
};

export default ShareButton;
