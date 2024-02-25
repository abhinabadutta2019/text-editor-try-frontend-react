import React, { useState, useEffect } from "react";

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/documents`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          console.log(response, "response");
          const data = await response.json();
          setDocuments(data);
        } else {
          console.error("Failed to fetch documents");
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h2>Documents</h2>
      <ul>
        {documents.map((document) => (
          <li key={document._id}>{document.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsPage;
