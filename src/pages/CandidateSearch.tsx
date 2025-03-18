import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  // This needs to display a LOT more than just a header
  // const users = await searchGithub();
  // console.log(users);
  const [userInfo, setUserInfo] = useState<Candidate>({} as Candidate);
  
  // This useEffect will get called immediately when we load the page
  useEffect(() => {
    const fetchData = async () => {
      const result = await searchGithub();

      let validUser = false;
      let ind = 0;
      let userInfo: Candidate; 
      while (!validUser && (ind < result.length)) {
        const username = result[ind].login;
        userInfo = await searchGithubUser(username) as Candidate;
        console.log(userInfo);

        // I'm not only requiring that we find a user, but that the user has an email and bio
        if ((Object.keys(userInfo).length > 0) && (userInfo.email !== null)) {
          console.log(`Found valid user! Their email is as follows: ${userInfo.email}`);
          validUser = true;
          break;
        } else {
          ind++;
        }
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

  return (<>
  <h1>Candidate Search</h1>
    <div>
      {Object.keys(userInfo).length > 0 ? 
      <><div className='candbox'>
        <a href={userInfo.html_url}><img id='candimg' src={userInfo.avatar_url}></img></a>
        <div id='cand-text'>
          <h2>{userInfo.login}</h2>
          {userInfo.location && <p>Location: {userInfo.location}</p>}
          {userInfo.email && <p>Email: <a href={userInfo.email as string}>{userInfo.email}</a> </p>}
          {userInfo.company && <p>Company: {userInfo.company}</p>}
          {userInfo.bio && <p>Bio: {userInfo.bio}</p>}
        </div>
      </div>

      <div id='button-div'>
        <button onClick={addCandidate}>+</button>
        <button onClick={skipCandidate}>-</button>
      </div>
      </> : <h2>Searching for candidates...</h2>
      }
    </div>
  </>
  );
};

export default CandidateSearch;
