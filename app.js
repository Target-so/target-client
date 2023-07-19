var videos = [];
var videoIds = [];
let currentVideoIndex = 0;

$(document).ready(function () {
  $.ajax({
    url: "https://bytesotech.cloud/target/api/ads/",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      videos = data;
      videoIds = videos.map(({ video }) => video.split("v=")[1]);
      playNextVideo(); // Start playing the videos
    //   setInterval(playNextVideo, 30000); // Play the next video every 30 seconds
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });

  const player = new Plyr("#player video", {
    controls: [],
    hideControls: true,
    autoplay: true,
  });

  function playNextVideo() {
    const video = videoIds[currentVideoIndex];
    player.source = {
      type: "video",
      sources: [
        {
          src: `https://www.youtube.com/embed/${video}?modestbranding=1&autoplay=1&controls=0`,
          provider: "youtube",
        },
      ],
    };
    currentVideoIndex++;
    if (currentVideoIndex >= videos.length) {
      currentVideoIndex = 0;
    }
    setInterval(playNextVideo, 30000);
  }
});
