import React from "react";
import { useLocation } from "react-router-dom";
import { EmailShareButton, WhatsappShareButton } from "react-share";

const ShareButton = () => {
  const location = useLocation();
  const url = window.location.href; // Get the current URL

  //   console.log(url, "url");

  return (
    <div>
      <h3>Share this document:</h3>
      {/* Share via email */}
      <EmailShareButton
        url={url}
        subject="Check out this document"
        body={`Check out this document: ${url}`}
      >
        Email
      </EmailShareButton>
      {/* Share via WhatsApp */}
      <WhatsappShareButton
        url={url}
        title="Check out this document"
        separator=":: "
      >
        WhatsApp
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButton;
