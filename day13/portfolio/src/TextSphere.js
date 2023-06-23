import React, { useEffect, useRef } from "react";
import TagCloud from "TagCloud";

const TextSphere = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let width = window.screen.width;
    let r = 150;
    if(width > 800)
        r = 300;
    const texts = [
      "HTML",
      "JS",
      "C",
      "React",
      "C#",
      "MySql",
      "C++",
      "Python",
      "JAVA",
      "Linux"
    ];
    const options = {
      radius: r,
      maxSpeed: "normal",
      initSpeed: "normal",
      keep: true,
      loop: true,
      lockX: true,
      lockY: true,
    };

    TagCloud(container, texts, options);

    return () => {
      TagCloud(container, [], {});
    };
  }, []);

  return (
    <div className="text-sphere">
      <span className="tagcloud" ref={containerRef}></span>
    </div>
  );
};

export default TextSphere;