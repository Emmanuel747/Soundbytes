import '../Styles/UploadBtn.scss'

export default function UploadBtn ({btnName} ) {
  
  return (
    <button 
      className="banner">
      <a href="#" className='butn butn__new'>
        <span>
        {!btnName ? "Upload SoundByte  🔼" : btnName}
        </span>
      </a>
    </button>
  );
}