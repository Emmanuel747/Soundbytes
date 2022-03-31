export default function Post({ post }) {
    return (
        <div className='bg-slate-300 border border-slate-600'>
            <h4>{"<POST TITLE>"}</h4>
            <p>{"<USERNAME>"}</p>
            <p>{"<TIMESTAMP>"}</p>
            <p>{"<LIKES>"}</p>
            <audio src='#' controls='controls'></audio>
        </div>
    );
}
