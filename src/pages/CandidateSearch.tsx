import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  // This needs to display a LOT more than just a header
  // const users = await searchGithub();
  // console.log(users);
  const [userInfo, setUserInfo] = useState<Candidate>({} as Candidate);
  const [validUser, setValidUser] = useState<boolean>(false);
  const [finishedSearching, setFinishedSearching] = useState<boolean>(false);
  
  // This useEffect will get called immediately when we load the page
  useEffect(() => {
    const fetchData = async () => {
      const result = await searchGithub();
      let ind = 0;
      let userInfo: Candidate; 
      while (!validUser && (ind < result.length)) {
        const username = result[ind].login;
        userInfo = await searchGithubUser(username) as Candidate;
        console.log(userInfo);

        // I'm not only requiring that we find a user, but that the user has an email and bio
        if ((Object.keys(userInfo).length > 0) && (userInfo.email !== null)) {
          console.log(`Found valid user! Their email is as follows: ${userInfo.email}`);
          setValidUser(true);
          break;
        } else {
          ind++;
        }
      }

      setFinishedSearching(true); 
      if (!validUser) {
        console.log(`Could not find user.`)
      }

      if (userInfo.bio && userInfo.bio.length > 100) {
        userInfo.bio = userInfo.bio.slice(0,100);
      }
      setUserInfo(userInfo);

      console.log(userInfo);
    };

    fetchData();
  }, []);

  const addCandidate = () => {
    console.log('Added new candidate to list of candidates.');
    const candidateList = JSON.parse(localStorage.getItem('candidateList') || '[]');
    candidateList.push(userInfo);
    localStorage.setItem('candidateList', JSON.stringify(candidateList));
    window.location.reload();
  }

  const skipCandidate = () => {
    window.location.reload();
  }

  const renderContent = () => {
    console.log('Rendering...');
    console.log(`validUser: ${validUser}`)
    if (validUser) {
      // In this case, the website found a valid user
      return <>
      <div className='candbox'>
        <a href={userInfo.html_url}><img id='candimg' src={userInfo.avatar_url}></img></a>
        <div id='cand-text'>
          <h2>{userInfo.login}</h2>
          {userInfo.location ? <p>Location: {userInfo.location}</p> : <p> Location: None provided</p>}
          {userInfo.email ? <p>Email: <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a> </p> : <p> Email: None provided</p>}
          {userInfo.company ? <p>Company: {userInfo.company}</p> : <p> Company: None specified</p>}
          {userInfo.bio ? <p>Bio: {userInfo.bio}</p> : <p> Bio: None provided</p>}
        </div>
      </div>

      <div id='button-div'>
        <button onClick={addCandidate}><img src="./images/accept.png"></img></button>
        <button onClick={skipCandidate}><img src="./images/reject.png"></img></button>
      </div>
    </>
    } else if (finishedSearching) {
      // In this case, our website searched through the API call and didn't find any suitable users.
      return <>
      <h2>No suitable candidates available to display!</h2>
      <p>Try refreshing the page</p>
      </>
    } else {
      // In this case, our website is still searching the API call for suitable users.
      return <>
      <h2>Searching for candidates...</h2>
      </>
    }
  }

  return (<>
  <h1>Candidate Search</h1>
    <div>{renderContent()}</div>
  </>
  );
};

export default CandidateSearch;
