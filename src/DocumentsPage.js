import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./shared/Footer";

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

  // Function to truncate the document content
  const truncateContent = (content) => {
    return content.length > 80 ? content.substring(0, 80) + "..." : content;
  };

  return (
    <>
      <div className="container mt-5 text-center">
        <h2 style={{ fontSize: "2rem" }}>Documents</h2>
        <button onClick={handleCreateDocument} className="btn btn-primary mb-3">
          Create New Document
        </button>
        <ul className="list-group text-left">
          {documents.map((document) => (
            <li
              key={document._id}
              className="list-group-item bg-transparent border-0"
              style={{ fontSize: "1.2rem", outline: "none" }}
            >
              <Link
                to={`/documents/${document._id}`}
                style={{
                  textDecoration: "underline", // Add underline style
                  color: "inherit",
                }}
              >
                {truncateContent(document.content)}
              </Link>
            </li>
          ))}
        </ul>
        {/*  */}
      </div>
      <Footer />
    </>
  );
};

export default DocumentsPage;
