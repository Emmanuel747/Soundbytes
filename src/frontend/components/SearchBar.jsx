import React, {useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Database } from "../../backend";
import "../Styles/SearchBar.scss";
import { Link } from "react-router-dom";


export default function SearchBar () {
// Load all userNames and filer
// on click forward to otherUse profile
  const [searchInput, setSearchInput] = useState('');
  const [userNames, setUsernames] = useState([])
  const [searchResults, setSearchResults] = useState([]);
  const [isActive, setActive] = useState(false);

  // Helper isActive toggle function ~Eman April 6, 2022 
  const handleToggle = () => {
    setActive(!isActive);
    console.log(isActive)
  };

  let usernamesArr = [];
  const getUsernames = async () => {
      let usernamesObj = await new Database().getAllUsernames()
      let sorted = Object.keys(usernamesObj);
      setUsernames(sorted.sort())
      console.log(userNames);
  };
  
  const filterUsernames = async () => {
    // if (usernamesArr !== undefined) {
    //   let filteredNames = [];
      
    //   usernamesArr.forEach(username => {
    //     filteredNames.push(<li onClick={() => {navigate(`/${username}`)}}>username</li>);
    //   });
    //   console.log(usernamesArr, filteredNames);
    // } else {
    //   return <li style={{textAlign: 'center', fontWeight: 'bold'}}> No Usernames Found </li>
    // }
    let arr = [];
    usernamesArr.forEach(name => {
        return (``);
      });
  }
  const navigate = useNavigate();

  const routeToUser = (username) => {
    setActive(false);
    navigate(`/profile/${username}`);
    window.location.reload(false);
  }
  return (
    <div className="searcbarContainer"
      onClick={() => {getUsernames()}}
    >
      <form action="" className="search" autoComplete="off">
        <input 
          className="search__input" 
          type="search" 
          placeholder="Search Users" 
          id="searchInput" 
          onChange={(e) => {setSearchInput(e.target.value)}}
          onClick={() => {filterUsernames(); handleToggle();}}
          
        />
        { userNames ? 
          <div className={isActive ? "suggestionBox active" : "suggestionBox inactive"} >
            <ul>
              {userNames.map(name => (<li onClick={() => {routeToUser(name)}}> {name} </li>))}
            </ul>
          </div> 
          : 
          <div className="suggestionBox" style={{display:'none'}}></div>
        }



        <div className="search__icon-container"
           
        >
          <label for="searchInput" className="search__label" aria-label="Search">
            <svg viewBox="0 0 1000 1000" title="Search"><path fill="currentColor" 
              d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z" /></svg>
          </label>

          <button className="search__submit" aria-label="Search" onClick={(e) => {e.preventDefault();}}>
            <svg viewBox="0 0 1000 1000" title="Search"><path fill="currentColor" 
              d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z" /></svg>
          </button>
        </div>
        
      </form>

    </div>
  );
}