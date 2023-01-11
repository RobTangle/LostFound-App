import ProgressBar from "@badrap/bar-of-progress";
import React from "react";

const ProxyProgressBar = ({ componentToPassDown }) => {
  
  const progress = new ProgressBar({
      // The size (height) of the progress bar.
      // Numeric values get converted to px.
      size: 4,
      // Color of the progress bar.
      // Also used for the glow around the bar.
      color: "#6366f1",
      // Class name used for the progress bar element.
      className: "bar-of-progress",
      // How many milliseconds to wait before the progress bar
      // animation starts after calling .start().
      delay: 80,
  });

  progress.start();

  setTimeout(() => {
      progress.finish();
  }, 5000);
  return (
    <>
     {componentToPassDown}  
    </>
  );
}

export default ProxyProgressBar;