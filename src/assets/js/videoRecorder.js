const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = event => {
  //   console.log(event);
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};

// Mediafile is saved by once after finishing recording
const startRecording = () => {
  //   console.log(streamObject);
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start(1000);
  //   console.log(videoRecorder);
  //   setTimeout(() => videoRecorder.stop(), 5000);
  videoRecorder.addEventListener("dataavilable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
  try {
    // waiting for user's answer : permission of recording
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    // videoPreview.muted=true;
    videoPreview.play();
    streamObject = stream;
    startRecording();
    // console.log(stream);
  } catch (error) {
    recordBtn.innerHTML = "😭Can't record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
  // below code is same but cannot use multiple function
  // recordBtn.onclick = getVideo;
}

if (recorderContainer) {
  init();
}
