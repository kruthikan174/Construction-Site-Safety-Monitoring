import React, { useState } from "react";

const FirstAidTab = () => {
  const [videoUrl, setVideoUrl] = useState("");

  const handlePlayVideo = (url) => {
    setVideoUrl(url);
  };

  const firstAidSteps = [
    {
      id: 1,
      title: "CPR (Cardiopulmonary Resuscitation)",
      description: "Learn how to perform CPR in case of a cardiac emergency.",
      image: "https://via.placeholder.com/150", // Replace with an appropriate image URL
      video: "8YREVVM2n7g", // Only the video ID
    },
    {
      id: 2,
      title: "Bleeding Control",
      description: "Steps to control bleeding and prevent infection.",
      image: "https://via.placeholder.com/150", // Replace with an appropriate image URL
      video: "8pTaqY40-Rs", // Only the video ID
    },
    {
      id: 3,
      title: "Fracture Management",
      description: "How to immobilize and manage fractures effectively.",
      image: "https://via.placeholder.com/150", // Replace with an appropriate image URL
      video: "sPzXAVNVJr0", // Only the video ID
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Basic First Aid</h2>
      <div className="accordion" id="firstAidAccordion">
        {firstAidSteps.map((step) => (
          <div className="accordion-item" key={step.id}>
            <h2 className="accordion-header" id={`heading-${step.id}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${step.id}`}
                aria-expanded="false"
                aria-controls={`collapse-${step.id}`}
              >
                {step.title}
              </button>
            </h2>
            <div
              id={`collapse-${step.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading-${step.id}`}
              data-bs-parent="#firstAidAccordion"
            >
              <div className="accordion-body">
                <p>{step.description}</p>
                {/* <img
                  src={step.image}
                  alt={step.title}
                  className="img-fluid mb-3"
                /> */}
                <br/>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handlePlayVideo(`https://www.youtube.com/embed/${step.video}`)
                  }
                >
                  Play Video
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {videoUrl && (
        <div className="mt-5">
          <h4>Video Tutorial</h4>
          <div className="ratio ratio-16x9">
            <iframe
              src={videoUrl}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstAidTab;

