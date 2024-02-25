import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  const handleCreateDocument = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/documents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const newDocument = await response.json();
        setDocuments([...documents, newDocument]);
      } else {
        console.error("Failed to create document");
      }
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <div>
      <h2>Documents</h2>
      <button onClick={handleCreateDocument}>Create New Document</button>
      <ul>
        {documents.map((document) => (
          <li key={document._id}>
            <Link to={`/documents/${document._id}`}>{document.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsPage;
