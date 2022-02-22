/*This function will call the home feed, along with the top and bottom bars of the home screen*/

export default function Feed() {
    return (
      <>
        <Topbar />
        <div className="homeContainer">
          <Feed/>
        </div>
        <BottomTab />
      </>
    );
  }